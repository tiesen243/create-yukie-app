import type { NextPage } from 'next'
import { cookies } from 'next/headers'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { auth } from '@/server/auth'
import { lucia } from '@/server/auth/lucia'
import { Post } from './_components/post'

const Page: NextPage = async () => {
  const session = await auth()

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
        {' using '} 
        <span className="bg-[linear-gradient(135deg,#2D3748,69%,hsl(var(--background)))] bg-clip-text text-transparent">
          Prisma 
        </span>
        {' and '} 
        <span className="bg-[linear-gradient(135deg,#FF4154,69%,hsl(var(--background)))] bg-clip-text text-transparent">
          @tanstack/react-query 
        </span>
      </Typography>

      <div className="mt-4 flex items-center gap-2">
        {session ? (
          <>
            <span>Logged in as {session.user.name}</span>
            <form
              action={async () => {
                'use server'
                await lucia.invalidateSession(session.id)
                cookies().delete(lucia.sessionCookieName)
              }}
            >
              <Button variant="ghost" size="sm">
                Logout
              </Button>
            </form>
          </>
        ) : (
          <form action="/api/auth/discord" method="GET">
            <Button variant="outline">Login with Discord</Button>
          </form>
        )}
      </div>

      {session && <Post />}
    </main>
  )
}

export default Page
