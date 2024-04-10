import { Elysia } from 'elysia'

import { formatError } from '@/server/plugins'

import { postRoute } from '@/server/routes/post.route'
import { userRoute } from '@/server/routes/user.route'

const app = new Elysia({ prefix: '/api/elysia' })
  .use(formatError)
  .use(userRoute)
  .use(postRoute)
  .compile()

const handler = app.handle
export { handler as DELETE, handler as GET, handler as PATCH, handler as POST }

export type App = typeof app
