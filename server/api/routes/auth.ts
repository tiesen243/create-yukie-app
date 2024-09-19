import { createElysia } from '@/server/api/elysia'
import { lucia } from '@/server/auth/lucia'

export const authRouter = createElysia({ prefix: '/auth' }).post(
  '/logout',
  async ({ session, cookie, error }) => {
    if (!session) return error('Unauthorized', 'You are not logged in')

    await lucia.invalidateSession(session.id)
    const sessionCookies = lucia.createBlankSessionCookie()
    cookie[sessionCookies.name]?.set({
      value: sessionCookies.value,
      ...sessionCookies.attributes,
    })

    return cookie[sessionCookies.name]
  },
)
