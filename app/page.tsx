import { ThemeBtn } from '@/components/theme-btn'
import { Typography } from '@/components/ui/typography'
import { AuthShowcase } from './_components/auth-showcase'
import { CreatePostForm, PostList } from './_components/post'

const Page = () => {
  return (
    <main className="container flex min-h-dvh max-w-screen-lg flex-col items-center justify-center overflow-x-hidden">
      <div className="pointer-events-none relative -z-10 flex place-items-center before:absolute before:h-[700px] before:w-[140px] before:translate-x-1 before:translate-y-[-10px] before:rotate-[-32deg] before:rounded-full before:bg-gradient-to-r before:from-[#2C2F7B] before:to-[#B45076] before:opacity-50 before:blur-[100px] before:content-[''] lg:before:h-[700px] lg:before:w-[240px] lg:before:translate-x-[-100px]" />
      <Typography level="h1" className="mb-4 text-center">
        Create <span className="text-[#774087]">Yukie</span> App
      </Typography>

      <AuthShowcase />

      <CreatePostForm />

      <ThemeBtn />

      <div className="mt-4 w-full max-w-2xl md:max-h-80 md:overflow-y-auto">
        <PostList />
      </div>
    </main>
  )
}

export default Page
