import type { NextPage } from 'next'
import Link from 'next/link'

import { CreatePost } from '@/components/create-post'
import { PostList } from '@/components/post-list'
import { auth } from '@/server/auth'

const Page: NextPage = async () => {
  const { user } = await auth()
  return (
    <>
      {user ? (
        <CreatePost />
      ) : (
        <p className="mb-4 text-center text-muted-foreground">
          You must be logged in to create a post
        </p>
      )}

      <p className="mb-4 text-center">
        Protected page. You must be logged in to see this page. You can log in by{' '}
        <Link href="/protected" className="underline-offset-4 hover:underline">
          visiting
        </Link>
      </p>

      <PostList userId={user?.id} />
    </>
  )
}

export default Page
