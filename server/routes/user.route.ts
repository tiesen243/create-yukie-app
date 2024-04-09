import Elysia from 'elysia'
import { Argon2id } from 'oslo/password'
import { cookies } from 'next/headers'

import { UserModel } from '@/server/models/user.model'
import { db } from '@/prisma'
import { lucia } from '@/server/auth'

export const UserRoute = new Elysia({ name: 'Route.User', prefix: '/user' })
  .use(UserModel)
  .post(
    '/sign-up',
    async ({ body, error }) => {
      const user = await db.user.findUnique({ where: { email: body.email } })
      if (user) return error(409, { message: 'User already exists' })

      const hash = await new Argon2id().hash(body.password)
      const newUser = await db.user.create({ data: { ...body, password: hash } })
      if (!newUser) return error(500, { message: 'Failed to create user' })
      return { message: 'User created successfully' }
    },
    { body: 'signUp' },
  )
  .post(
    '/sign-in',
    async ({ body: { email, password }, error }) => {
      const user = await db.user.findUnique({ where: { email: email } })
      if (!user) return error(404, { message: 'User not found' })

      const isValid = await new Argon2id().verify(user.password, password)
      if (!isValid) return error(401, { message: 'Invalid password' })

      const session = await lucia.createSession(user.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

      return { message: 'User signed in successfully' }
    },
    { body: 'signIn' },
  )
  .post('/sign-out', async () => {
    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  })
