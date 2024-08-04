'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'
import { revalidate } from '@/server/actions'
import { useSession } from '@/lib/session'

export const CreatePostForm: React.FC = () => {
  const { isAuthed } = useSession()
  const form = useForm<FormValues>({ resolver })

  if (!isAuthed) return null

  const handleSubmit = form.handleSubmit(async (data) => {
    await api.post.create.post(data)
    form.reset()
    revalidate({ path: '/' })
  })

  return (
    <Form onSubmit={handleSubmit} className="mx-auto max-w-screen-md">
      <FormField
        register={form.register}
        name="content"
        error={form.formState.errors.content}
        disabled={form.formState.isSubmitting}
        asChild
      >
        <Textarea placeholder="What are you thinking about?" />
      </FormField>
      <Button className="w-32 self-end" isLoading={form.formState.isSubmitting}>
        Post
      </Button>
    </Form>
  )
}

const schema = z.object({
  content: z.string().min(4, 'Content must be at least 4 characters long'),
})

type FormValues = z.infer<typeof schema>

const resolver = zodResolver(schema)
