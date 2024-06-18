'use client'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'
import { DeletePost } from './delete-post'
import { useAuth } from '@/lib/auth'

export const PostList: React.FC = () => {
  const { user } = useAuth()
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await api.post['get-all'].get()
      if (error) throw error.value
      return data
    },
  })

  if (isLoading || !data) return <p>Loading...</p>

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {data.map((post) => (
        <li key={post.id} className="space-y-4 rounded-md border p-6 shadow-lg">
          <div>
            <h3 className="line-clamp-1 text-2xl font-bold">{post.title}</h3>
            <p className="text-sm text-muted-foreground">{post.author.name}</p>
          </div>

          <p className="line-clamp-1 break-all">{post.content}</p>

          {user?.id === post.author.id && <DeletePost id={post.id} />}
        </li>
      ))}
    </ul>
  )
}
