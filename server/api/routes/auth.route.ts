import { Scrypt } from 'lucia'
import { cookies } from 'next/headers'

import { createElysia } from '@/server/api/elysia'
import { authModel } from '@/server/api/models/auth.model'
import { lucia } from '@/server/auth/lucia'

export const authRoute = createElysia({ prefix: '/auth', name: 'auth.route' })
  .use(authModel)
  .post(
    '/register',
    async ({ body, db, error }) => {
      const isExisted = await db.user.findUnique({ where: { email: body.email } })
      if (isExisted) return error('Conflict', { message: 'User already existed' })

      const password = await new Scrypt().hash(body.password)
      const user = await db.user.create({ data: { ...body, password } })
      if (!user) return error('Internal Server Error', { message: 'Failed to create user' })

      return { message: 'User created' }
    },
    { body: 'register' },
  )
  .post(
    '/login',
    async ({ body, db, error }) => {
      const user = await db.user.findUnique({ where: { email: body.email } })
      if (!user) return error('Not Found', { message: 'User not found' })

      const isValid = await new Scrypt().verify(user.password, body.password)
      if (!isValid) return error('Unauthorized', { message: 'Password is incorrect' })

      const session = await lucia.createSession(user.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)

      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

      return { message: 'Login success' }
    },
    { body: 'login' },
  )
  .post('/logout', async () => {
    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return { message: 'Logout success' }
  })
