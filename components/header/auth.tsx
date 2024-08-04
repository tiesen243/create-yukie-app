import { auth } from '@/server/auth'
import Link from 'next/link'
import { LogoutBtn } from './logout-btn'

export const Auth: React.FC = async () => {
  const { user } = await auth()

  if (!user)
    return (
      <div className="flex items-center gap-2">
        <Link href="/sign-up" className="hover:underline">
          Sign up
        </Link>
        |
        <Link href="/sign-in" className="hover:underline">
          Sign in
        </Link>
      </div>
    )

  return (
    <div className="flex items-center gap-2">
      <p className="text-lg font-semibold">{user.name}</p>
      <LogoutBtn />
    </div>
  )
}
