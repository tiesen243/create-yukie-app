import type { NextPage } from 'next'

import { CreatePostForm } from '@/components/post/create-form'
import { DeleteBtn } from '@/components/post/delete-btn'
import { api } from '@/lib/api'

interface Post {
  id: string
  content: string
  author: {
    name: string
  }
}

const Page: NextPage = async () => {
  const posts = (await api.post.getPosts
    .get({ fetch: { next: { tags: ['posts'] } } })
    .then((res) => res.data)) as Post[]

  return (
    <>
      <CreatePostForm />

      <section className="my-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="rounded-md border p-4">
            <p className="text-xl font-bold">{post.content}</p>
            <small className="text-muted-foreground">by {post.author.name}</small>
            <DeleteBtn id={post.id} />
          </article>
        ))}
      </section>
    </>
  )
}

export default Page
