'use client'

import { SendHorizonalIcon } from 'lucide-react'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { useMutation } from '@/lib/hooks'
import { z } from 'zod'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

const schema = z.object({
  content: z.string().min(4),
})

export const CreatePost: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const { trigger, isMutating, fieldErrors } = useMutation(async (arg) => {
    const body = schema.parse(Object.fromEntries(arg))
    const { error } = await api.post.create.post(body)
    if (error) throw new Error(error.value.message)
    formRef.current?.reset()
    router.refresh()
  })

  return (
    <Card className="mx-auto mb-4 max-w-screen-md">
      <form ref={formRef} action={trigger}>
        <CardHeader className="flex-row items-center gap-2 space-y-0">
          <FormField name="content" placeholder="What are you thinking?" className="flex-grow" />
          <Button variant="ghost" size="icon" isLoading={isMutating}>
            <SendHorizonalIcon />
          </Button>
        </CardHeader>
        <CardFooter>
          <p className="text-destructive">{fieldErrors?.content}</p>
        </CardFooter>
      </form>
    </Card>
  )
}
