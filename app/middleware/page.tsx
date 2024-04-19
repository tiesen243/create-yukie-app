import type { NextPage } from 'next'

import { api } from '@/lib/api'
import { Typography } from '@/components/ui/typography'
import { FormField } from '@/components/ui/form-field'
import { Button } from '@/components/ui/button'
import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'

const Page: NextPage = async () => {
  const { data, error } = await api.post.getAll.get({ fetch: { next: { tags: ['posts'] } } })
  if (error) return <div>Error</div>

  const action = async (fd: FormData) => {
    'use server'
    await api.post.create.post(
      { content: String(fd.get('content')) },
      {
        headers: {
          Cookie: cookies().toString(),
        },
      },
    )

    revalidateTag('posts')
  }

  return (
    <div className="mx-auto my-4 max-w-screen-md space-y-4">
      <form action={action} className="flex items-center">
        <FormField name="content" placeholder="What is on your mind?" className="flex-1" />
        <Button type="submit">Submit</Button>
      </form>

      <Typography variant="h1">Posts</Typography>
      <ul className="space-y-4">
        {data?.map((post) => (
          <li key={post.id} className="rounded-lg border p-4">
            <Typography variant="h4">{post.author.name}</Typography>
            <Typography variant="h3">{post.content}</Typography>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Page
