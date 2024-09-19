'use client'

import type { Post as IPost } from '@prisma/client'
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/elysia/react'

export const Post: React.FC = () => {
  const [content, setContent] = useState<string>('')
  const { data: post, refetch } = useQuery({
    queryKey: ['post', 'latest'],
    queryFn: async () => {
      const res = await api.post.latestPost.get()
      return res.data as IPost
    },
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['post', 'create'],
    mutationFn: async () => {
      await api.post.createPost.post({ content })
    },
    onSuccess: async () => {
      await refetch()
      setContent('')
    },
  })

  return (
    <div className="w-full max-w-xs space-y-4">
      {post ? (
        <p className="truncate">Most recent post: {post.content}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          mutate()
        }}
        className="flex flex-col gap-2"
      >
        <Input
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          disabled={isPending}
        />
        <Button disabled={isPending}>{isPending ? 'Posting...' : 'Post'}</Button>
      </form>
    </div>
  )
}
