import type { Post, User } from '@prisma/client'
import type { NextPage } from 'next'

import { CreatePostForm } from '@/components/post/create-form'
import { DeleteBtn } from '@/components/post/delete-btn'
import { api } from '@/lib/api'

type TPost = Post & { author: User }

const Page: NextPage = async () => {
  const posts = await api.post.getPosts.get().then((res) => res.data as TPost[])

  return (
    <>
      <article className="mb-40 mt-80 space-y-8">
        <h1 className="text-center text-3xl font-bold">
          Next.js + ElysiaJS + Prisma + TailwindCSS Template
        </h1>

        <p className="text-center text-muted-foreground">Login to create a post</p>
      </article>

      <CreatePostForm />

      <ul className="mx-auto mt-4 grid max-w-screen-md grid-cols-3 gap-4">
        {posts.map((post) => (
          <li key={post.id} className="flex items-center justify-between rounded-lg border p-4">
            <p>{post.content}</p>

            <DeleteBtn id={post.id} uid={post.author.id} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default Page
