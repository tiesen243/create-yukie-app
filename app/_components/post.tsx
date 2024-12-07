'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/elysia/react'

export const Post: React.FC = () => {
  const [latestPost, { refetch }] = api.post.getLatestPost.get.useSuspenseQuery()
  const createPost = api.post.createPost.post.useMutation({ onSuccess: () => refetch() })

  return (
    <div className="mt-4 w-full max-w-screen-sm">
      <span className="text-lg">Latest post: {latestPost?.content ?? 'No posts'}</span>
      <form
        className="flex w-full gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          createPost.mutate({ content: String(new FormData(e.currentTarget).get('content')) })
          e.currentTarget.reset()
        }}
      >
        <Input name="content" placeholder="Post's content" disabled={createPost.isPending} />
        <Button disabled={createPost.isPending}>Post</Button>
      </form>
    </div>
  )
}
