'use client'

import { useMutation } from '@tanstack/react-query'
import { SendHorizonalIcon } from 'lucide-react'
import { z } from 'zod'

import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { revalidate } from '@/server/actions'
import { api } from '@/lib/api'

export const CreatePostForm: React.FC = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const parsed = schema.safeParse(Object.fromEntries(formData))
      if (!parsed.success) throw parsed.error.flatten().fieldErrors
      await api.post.create.post(parsed.data)
      revalidate({ tag: 'posts' })
    },
  })
  return (
    <form action={mutate} className="flex gap-2">
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
