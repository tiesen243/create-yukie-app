import { ExternalLinkIcon } from 'lucide-react'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { CreatePost } from '@/components/create-post'
import { PostList } from '@/components/post-list'
import { Button } from '@/components/ui/button'
import { auth } from '@/server/auth'

const Page: NextPage = async () => {
  const { user } = await auth()
  const size = 120
  return (
    <>
      <div className="flex aspect-video flex-col items-center justify-center gap-20">
        <div className="before:bg-gradient-radial after:bg-gradient-conic relative z-[-1] flex items-center gap-8 before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] md:gap-12 lg:gap-16 before:lg:h-[360px]">
          <Image
            src="/nextjs.svg"
            width={size}
            height={size}
            className="size-28 md:size-40 lg:size-64"
            alt="Next.js logo"
          />
          <span className="text-4xl font-bold">X</span>
          <Image
            src="/elysia.svg"
            width={size}
            height={size}
            className="size-28 md:size-40 lg:size-64"
            alt="Elysiajs logo"
          />
        </div>

        <div className="flex gap-4">
          <Button className="gap-2 rounded-full" asChild>
            <Link href="https://tiesen.id.vn/blog/next-elysia">
              Documentation <ExternalLinkIcon size={16} />
            </Link>
          </Button>

          <Button variant="secondary" className="gap-2 rounded-full" asChild>
            <Link href="/server">
              Middleware example <ExternalLinkIcon size={16} />
            </Link>
          </Button>
        </div>
      </div>

      {user && <CreatePost />}
      <PostList user={user?.id} />
    </>
  )
}

export default Page
