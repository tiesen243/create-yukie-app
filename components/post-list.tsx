import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import { DeletePost } from './delete-post'

export const PostList: React.FC<{ userId?: string }> = async ({ userId }) => {
  const { data, error } = await api.post.getAll.get({ fetch: { next: { tags: ['posts'] } } })

  if (error || !data) return <div>{error.value.message ?? 'Unknow error'}</div>

  return (
    <div className="container mb-4 max-w-screen-md space-y-4">
      {data.map((post) => (
        <Card key={post.id}>
          {userId === post.author.id && <DeletePost postId={post.id} />}
          <CardHeader>
            <CardDescription>{post.author.name}</CardDescription>
          </CardHeader>
          <CardFooter>
            <CardTitle>{post.content}</CardTitle>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
