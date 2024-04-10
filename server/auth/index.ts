import type { Session, User } from 'lucia'
import { cookies } from 'next/headers'
import { cache } from 'react'

import { lucia } from './lucia'

export const uncachedAuth = async (): Promise<{ user: User | null; session: Session | null }> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
  if (!sessionId) return { user: null, session: null }

  const result = await lucia.validateSession(sessionId)

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
  } catch {
    console.error('Failed to set session cookie')
  }
  return result
}

export const auth = cache(uncachedAuth)
