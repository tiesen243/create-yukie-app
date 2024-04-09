'use client'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { usePost } from '@/lib/hooks'
import { Loader2Icon, XIcon } from 'lucide-react'
import { Button } from './ui/button'

export const PostList: React.FC<{ user?: string }> = ({ user }) => {
  const { posts, isLoading, getError, del } = usePost()

  if (isLoading) return <Loader2Icon className="mx-auto animate-spin" />
  if (getError || !posts)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return <p className="text-center text-destructive">Error: {getError?.message}</p>

  return (
    <section className="mx-auto mb-4 max-w-screen-md space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          {post.author.id === user && (
            <Button
              onClick={() => del(post.id)}
              className="absolute right-2 top-2 z-10"
              variant="ghost"
              size="icon"
            >
              <XIcon />
            </Button>
          )}
          <CardHeader>
            <CardDescription>{post.author.name}</CardDescription>
            <CardTitle>{post.content}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </section>
  )
}
