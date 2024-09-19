import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { api } from '@/lib/api'
import { auth } from '@/server/auth'

const Page: NextPage = async () => {
  const session = await auth()
  const post = await api.post.latestPost.get()

  return (
    <main className="container flex min-h-dvh max-w-screen-lg flex-col items-center justify-center overflow-x-hidden">
      <div className="pointer-events-none relative flex place-items-center before:absolute before:h-[700px] before:w-[140px] before:translate-x-1 before:translate-y-[-10px] before:rotate-[-32deg] before:rounded-full before:bg-gradient-to-r before:from-[#AB1D1C] before:to-[#E18317] before:opacity-30 before:blur-[100px] before:content-[''] lg:before:h-[700px] lg:before:w-[240px] lg:before:translate-x-[-100px]" />

      <Image src="https://tiesen.id.vn/assets/tiesen.png" width={2500} height={400} alt="tiesen" />

      <Typography level="h1" className="text-center brightness-150">
        A Full-Stack Application with{' '}
        <span className="bg-[linear-gradient(135deg,#AB1D1C,69%,hsl(var(--background)))] bg-clip-text text-transparent">
          Next.js
        </span>{' '}
        and{' '}
        <span className="bg-[linear-gradient(135deg,#E18317,69%,hsl(var(--background)))] bg-clip-text text-transparent">
          ElysiaJS
        </span>
      </Typography>

      <div className="mt-8 flex items-center gap-4">
        {session ? (
          <>
            <Typography className="text-center">Logged in as {session.user.name} </Typography>
            <Button variant="outline" size="sm">
              Sign out
            </Button>
          </>
        ) : (
          <Button variant="outline" asChild>
            <Link href="/api/auth/discord">Login with Discord</Link>
          </Button>
        )}
      </div>

      <div className="mt-8">
        <Typography className="text-center">
          Latest Post: {post.data.content ?? 'You have no post yet'}
        </Typography>
      </div>
    </main>
  )
}

export default Page
