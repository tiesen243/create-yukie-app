import { Scrypt } from 'lucia'
import { cookies } from 'next/headers'

import { lucia } from '@/server/auth/lucia'
import { createElysia } from '@/server/elysia'
import { authSchema } from '../validates/auth'

export const authRouter = createElysia({ prefix: '/auth' })
  .use(authSchema)

  .get('/me', async ({ user, session }) => {
    const isAuthed = user && session
    return { user: { ...user, password: undefined }, session, isAuthed }
  })

  .post(
    '/signup',
    async ({ db, body, error }) => {
      if (body.password !== body.confirmPassword)
        return error('Bad Request', 'Passwords do not match.')

      const isEmailTaken = await db.user.findUnique({ where: { email: body.email } })
      if (isEmailTaken) return error('Conflict', 'Email is already taken.')

      const user = await db.user.create({
        data: {
          ...body,
          password: await new Scrypt().hash(body.password),
        },
      })
      if (!user) return error('Internal Server Error', 'Failed to create user.')

      return { user }
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

      return { user }
    },
    { body: 'signinSchema' },
  )

  .post('/signout', async ({ session }) => {
    if (!session) return
    await lucia.invalidateSession(session.id)
    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  })
