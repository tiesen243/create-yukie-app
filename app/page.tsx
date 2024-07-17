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
  const { data: posts } = (await api.post.getPosts.get({
    fetch: { next: { tags: ['posts'] } },
  })) as { data: Post[] }

  return (
    <>
      <article className="mb-40 mt-80 space-y-8">
        <h1 className="text-center text-3xl font-bold">
          Next.js + ElysiaJS + Prisma + TailwindCSS Template
        </h1>

        <p className="text-center text-muted-foreground">Login to create a post</p>
      </article>

      <CreatePostForm />

      <section className="container my-4 grid max-w-screen-md grid-cols-1 gap-4 md:grid-cols-2">
        {posts?.map((post) => (
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
