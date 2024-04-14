import { Elysia } from 'elysia'

import { postRoute } from '@/server/routes/post.route'
import { userRoute } from '@/server/routes/user.route'

const app = new Elysia({ prefix: '/api' }).use(userRoute).use(postRoute).compile()

export const handler = app.handle

export type App = typeof app
