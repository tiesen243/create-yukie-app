'use client'

import { SendHorizonalIcon } from 'lucide-react'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { usePost } from '@/lib/hooks'

export const CreatePost: React.FC = () => {
  const { create, isMutating, createError } = usePost()
  const formRef = useRef<HTMLFormElement>(null)

  const action = (fd: FormData) => {
    create(fd)
    formRef.current?.reset()
  }
  return (
    <Card className="mx-auto mb-4 max-w-screen-md">
      <form ref={formRef} action={action}>
        <CardHeader className="flex-row items-center gap-2 space-y-0">
          <FormField name="content" placeholder="What are you thinking?" className="flex-grow" />
          <Button variant="ghost" size="icon" isLoading={isMutating}>
            <SendHorizonalIcon />
          </Button>
        </CardHeader>
        <CardFooter>
          {createError && <p className="text-destructive">{createError.fieldErrors?.content}</p>}
        </CardFooter>
      </form>
    </Card>
  )
}
