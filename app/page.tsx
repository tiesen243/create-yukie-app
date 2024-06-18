import type { NextPage } from 'next'
import Link from 'next/link'

import { CreatePost } from '@/components/create-post'
import { PostList } from '@/components/post-list'

const Page: NextPage = () => (
  <>
    <CreatePost />

    <p className="mb-4 text-center">
      Protected page. You must be logged in to see this page. You can log in by{' '}
      <Link href="/protected" className="underline-offset-4 hover:underline">
        visiting
      </Link>
    </p>

    <PostList />
  </>
)

export default Page
