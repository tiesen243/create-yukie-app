import { auth } from '@/server/auth'
import { ThemeBtn } from './theme-btn'
import Link from 'next/link'

export const Header: React.FC = async () => {
  const session = await auth()

  return (
    <header className="sticky inset-0 z-50 border-b bg-background/70 py-2 backdrop-blur-xl backdrop-saturate-150">
      <div className="container flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold">Next.js x ElysiaJS</h1>
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium">
            {session && session.user ? (
              session.user.name
            ) : (
              <>
                <Link href="/login">Login</Link> / <Link href="/register">Register</Link>
              </>
            )}
          </span>
          <ThemeBtn />
        </div>
      </div>
    </header>
  )
}
