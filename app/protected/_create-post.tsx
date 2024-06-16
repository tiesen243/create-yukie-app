import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'

export const CreatePost: React.FC = () => {
  const action = async (formData: FormData) => {
    'use server'
    await api.post.create.post(
      {
        title: String(formData.get('title')),
        content: String(formData.get('content')),
      },
      { headers: { cookie: cookies() } },
    )

    revalidateTag('posts')
  }
  return (
    <form action={action} className="mb-4 space-y-4">
      <FormField name="title" label="Title" placeholder="What's on your mind?" />
      <FormField name="content" label="Content" placeholder="Tell us more..." asChild>
        <Textarea />
      </FormField>

      <Button className="w-full">Create</Button>
    </form>
  )
}
