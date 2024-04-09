import { Lucia, type Session, type User } from 'lucia'
import type { User as DbUser } from '@prisma/client'
import Elysia from 'elysia'

import { adapter } from '@/prisma'
import { env } from '@/env.mjs'
import { cookies } from 'next/headers'

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: Omit<DbUser, 'password'>
  }
}

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: { secure: env.NODE_ENV === 'production' },
  },
  getUserAttributes: (attr) => ({ name: attr.name, email: attr.email }),
})

export const validateCookie = async (
  cookie: string,
): Promise<{
  session: Session | null
  user: User | null
}> => {
  const sessionId = lucia.readSessionCookie(cookie)
  if (!sessionId) return { session: null, user: null }
  const { session, user } = await lucia.validateSession(sessionId)
  return { session, user }
}

export const auth = async (): Promise<{ session: Session | null; user: User | null }> => {
  const cookie = cookies().get(lucia.sessionCookieName)
  if (!cookie) return { session: null, user: null }
  return validateCookie(`${lucia.sessionCookieName}=${cookie.value}`)
}

export const authMiddleware = new Elysia({ name: 'Middleware.Auth' }).derive(
  { as: 'scoped' },
  async ({ cookie: { auth_session }, error }) => {
    const auth = cookies().get(lucia.sessionCookieName)
    if (!auth || !auth_session) return error(401, { message: 'You are not authenticated.' })
    const value = auth.value || auth_session.value
    const { session, user } = await validateCookie(`${lucia.sessionCookieName}=${value}`)
    return { user, session }
  },
)
