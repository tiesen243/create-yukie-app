'use client'

import type { Post } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { usePost } from '@/hooks/use-post'
import { usePosts } from '@/hooks/use-posts'
import { cn } from '@/lib/utils'

export const CreatePostForm: React.FC = () => {
  const { createPost, isCreating, fieldErrors } = usePosts()

  return (
    <form
      className="flex w-full max-w-2xl flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        createPost({
          title: fd.get('title') as string,
          content: fd.get('content') as string,
        })
        e.currentTarget.reset()
      }}
    >
      <div>
        <Input name="title" placeholder="What's on your mind?" />
        {fieldErrors?.title && (
          <p className="text-xs text-destructive">{fieldErrors.title}</p>
        )}
      </div>

      <div>
        <Input name="content" placeholder="Tell us more" />
        {fieldErrors?.content && (
          <p className="text-xs text-destructive">{fieldErrors.content}</p>
        )}
      </div>
      <Button disabled={isCreating}>Create</Button>
    </form>
  )
}

export const PostList: React.FC = () => {
  const { posts, isLoading } = usePosts()

  if (isLoading)
    return (
      <div className="flex w-full flex-col gap-4">
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </div>
    )

  return (
    <div className="flex w-full flex-col gap-4">
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  )
}

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const { deletePost } = usePost(post.id)
  return (
    <Card className="flex justify-between">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.content}</CardDescription>
      </CardHeader>

      <Button
        variant="ghost"
        className="m-6 ml-0"
        onClick={() => {
          deletePost()
        }}
      >
        Delete
      </Button>
    </Card>
  )
}

export const PostCardSkeleton: React.FC<{ pulse?: boolean }> = ({ pulse = true }) => (
  <Card>
    <CardHeader>
      <CardTitle className={cn('w-1/4 rounded bg-primary', pulse && 'animate-pulse')}>
        &nbsp;
      </CardTitle>
      <CardDescription
        className={cn('w-1/3 rounded bg-current', pulse && 'animate-pulse')}
      >
        &nbsp;
      </CardDescription>
    </CardHeader>
  </Card>
)
