import type { NextPage } from 'next'

import { api } from '@/lib/api'
import { CreatePost } from './_create-post'
import { DeletePost } from './_delete-post'

const Page: NextPage = async () => {
  const { data } = await api.post['get-all'].get({ fetch: { next: { tags: ['posts'] } } })

  return (
    <>
      <CreatePost />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {data?.map((post) => (
          <li key={post.id} className="space-y-4 rounded-md border p-6 shadow-lg">
            <div>
              <h3 className="line-clamp-1 text-2xl font-bold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.author.name}</p>
            </div>

            <p className="line-clamp-1 break-all">{post.content}</p>

            <DeletePost id={post.id} userId={post.author.id} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default Page
