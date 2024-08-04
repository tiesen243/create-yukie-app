import { Scrypt } from 'lucia'
import { cookies } from 'next/headers'

import { createElysia } from '@/server/api/elysia'
import { authSchema } from '@/server/api/validates/auth'
import { lucia } from '@/server/auth/lucia'

export const authRouter = createElysia({ prefix: '/auth' })
  .use(authSchema)

  .post(
    '/signup',
    async ({ db, body, error }) => {
      const isEmailTaken = await db.user.findUnique({ where: { email: body.email } })
      if (isEmailTaken) return error('Conflict', 'Email is already taken.')

      const user = await db.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: await new Scrypt().hash(body.password),
        },
      })
      if (!user) return error('Internal Server Error', 'Failed to create user.')

      return { success: true }
    },
    { body: 'signupSchema' },
  )

  .post(
    '/signin',
    async ({ db, body, error }) => {
      const user = await db.user.findUnique({ where: { email: body.email } })
      if (!user) return error('Not Found', 'User not found.')

      const isValid = await new Scrypt().verify(user.password, body.password)
      if (!isValid) return error('Unauthorized', 'Invalid password.')

      const session = await lucia.createSession(user.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

      return { success: true }
    },
    { body: 'signinSchema' },
  )

  .post('/signout', async ({ session, error }) => {
    if (!session) return error('Unauthorized', 'You must be logged in to sign out.')
    await lucia.invalidateSession(session.id)
    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return { success: true }
  })
