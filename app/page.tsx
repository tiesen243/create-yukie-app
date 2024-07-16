import type { NextPage } from 'next'
import type { Post } from '@prisma/client'

import { CreatePostForm } from '@/components/post/create-form'
import { api } from '@/lib/api'

const Page: NextPage = async () => {
  const posts = (await api.post.getPosts
    .get({ fetch: { next: { tags: ['posts'] } } })
    .then((res) => res.data)) as Post[]

  return (
    <>
      <CreatePostForm />

      <section>
        {posts.map((post) => (
          <article key={post.id} className="rounded-md border p-4">
            <p>{post.content}</p>
          </article>
        ))}
      </section>
    </>
  )
}

export default Page
