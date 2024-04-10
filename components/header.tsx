import { Typography } from '@/components/ui/typography'
import { LogOutBtn } from './log-out-btn'
import { ThemeBtn } from './theme-btn'
import { auth } from '@/server/auth'

export const Header: React.FC = async () => {
  const { user } = await auth()

  return (
    <header className="sticky inset-0 z-50 border-b bg-background/70 py-2 backdrop-blur-xl backdrop-saturate-150">
      <div className="container flex items-center justify-between gap-4">
        <Typography variant="link" className="text-2xl font-bold hover:no-underline">
          Next Elysia
        </Typography>

        <div className="flex items-center gap-2">
          {!user ? (
            <span className="flex gap-2">
              <Typography variant="link" href="/auth/login">
                Login
              </Typography>
              /
              <Typography variant="link" href="/auth/register">
                Register
              </Typography>
            </span>
          ) : (
            <>
              <Typography variant="h4">Hello, {user.name}</Typography>
              <LogOutBtn />
            </>
          )}
          <ThemeBtn />
        </div>
      </div>
    </header>
  )
}
