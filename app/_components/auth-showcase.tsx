import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { auth, invalidateSession } from '@/server/auth'

export async function AuthShowcase() {
  const session = await auth()

  if (!session.user) {
    return (
      <form className="mb-4 flex flex-col gap-4">
        <Button size="lg" formAction={'/api/auth/discord'}>
          Sign in with Discord
        </Button>
      </form>
    )
  }

  return (
    <div className="mb-4 flex flex-col items-center justify-center gap-4">
      <Typography className="text-xl">Logged in as {session.user.name}</Typography>

      <form action={invalidateSession}>
        <Button>Sign out</Button>
      </form>
    </div>
  )
}
