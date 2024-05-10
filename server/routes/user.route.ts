import Elysia from 'elysia'
import { Scrypt } from 'lucia'
import { cookies } from 'next/headers'

import { db } from '@/prisma'
import { userModel } from '@/server/models/user.model'
import { context } from '@/server/plugins'
import { lucia } from '@/server/auth/lucia'

export const userRoute = new Elysia({ name: 'Route.User', prefix: '/user' })
  .use(context)
  .use(userModel)

  // [POST] /user/sign-up
  .post(
    '/sign-up',
    async ({ db, body, error }) => {
      const user = await db.user.findUnique({ where: { email: body.email } })
      if (user) return error(409, { message: 'User already exists' })

      const hash = await new Scrypt().hash(body.password)
      const newUser = await db.user.create({ data: { ...body, password: hash } })
      if (!newUser) return error(500, { message: 'Failed to create user' })
      return { message: 'User created successfully' }
    },
    { body: 'signUp' },
  )

  // [POST] /user/sign-in
  .post(
    '/sign-in',
    async ({ body: { email, password }, error }) => {
      const user = await db.user.findUnique({ where: { email: email } })
      if (!user) return error(404, { message: 'User not found' })

      const isValid = await new Scrypt().verify(user.password, password)
      if (!isValid) return error(401, { message: 'Password is incorrect' })

      const session = await lucia.createSession(user.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

      return { message: 'User signed in successfully' }
    },
    { body: 'signIn' },
  )

  // [POST] /user/sign-out
  .post('/sign-out', async () => {
    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  })
