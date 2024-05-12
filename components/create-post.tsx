'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SendHorizonalIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, TextField } from '@/components/ui/form'
import { api } from '@/lib/api'
import { revalidate } from '@/lib/revalidate'

const schema = z.object({
  content: z.string().min(4, 'Content is too short'),
})

export const CreatePost: React.FC = () => {
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) })
  const handleSubmit = form.handleSubmit(async (formData: z.infer<typeof schema>) => {
    await api.post['create-post'].post(formData)
    revalidate('posts')
    form.reset({ content: '' })
  })
  const isPending = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="container mb-4 flex max-w-screen-md items-start">
        <TextField
          control={form.control}
          name="content"
          placeholder="What's on your mind?"
          classes={{ item: 'w-full mr-2' }}
          disabled={isPending}
        />
        <Button variant="ghost" size="icon" isLoading={isPending}>
          <SendHorizonalIcon />
        </Button>
      </form>
    </Form>
  )
}
