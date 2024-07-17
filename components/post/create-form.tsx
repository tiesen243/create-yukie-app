'use client'

import { useMutation } from '@tanstack/react-query'
import { SendHorizonalIcon } from 'lucide-react'
import { z } from 'zod'

import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import { revalidate } from '@/server/actions'
import { useRef } from 'react'

export const CreatePostForm: React.FC = () => {
  const { isAuthed } = useAuth()
  const formRef = useRef<HTMLFormElement>(null)
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const parsed = schema.safeParse(Object.fromEntries(formData))
      if (!parsed.success) throw parsed.error.flatten().fieldErrors
      await api.post.create.post(parsed.data)
      revalidate({ tag: 'posts' })
      formRef.current?.reset()
    },
  })

  if (!isAuthed) return null

  return (
    <form action={mutate} ref={formRef} className="container flex max-w-screen-md gap-2">
      <FormField
        name="content"
        placeholder="What are you thinking?"
        className="flex-1"
        disabled={isPending}
      />
      <Button variant="ghost" size="icon" isLoading={isPending}>
        <SendHorizonalIcon />
      </Button>
    </form>
  )
}

const schema = z.object({
  content: z.string().min(4, 'Content must be at least 4 characters long'),
})
