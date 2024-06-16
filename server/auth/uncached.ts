import type { Session, User } from '@prisma/client'
import { cookies } from 'next/headers'

import { lucia } from '@/server/auth/lucia'

interface IAuth {
  user: User | null
  session: Session | null
}

export const uncachedAuth = async (): Promise<IAuth> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
  if (!sessionId) return { user: null, session: null }

  const res = await lucia.validateSession(sessionId)

  try {
    if (res.session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(res.session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
    if (!res.session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
  } catch {
    console.error('Failed to set session cookie')
  }

  return res
}
