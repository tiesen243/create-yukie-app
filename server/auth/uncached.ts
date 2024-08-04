import 'server-only'

import type { Session, User } from '@prisma/client'
import { cookies } from 'next/headers'

import { lucia } from '@/server/auth/lucia'

type Auth = { user: User | null; session: Session | null }

export const uncachedAuth = async (): Promise<Auth> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
  if (!sessionId) return { user: null, session: null }

  const result = await lucia.validateSession(sessionId)

  try {
    if (result.session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
  } catch {
    return { user: null, session: null }
  }
  return result
}
