import { createElysia } from '@/server/elysia'

import { authRouter } from '@/server/routes/auth'
import { postRouter } from './routes/post'

export const appRouter = createElysia({ prefix: '/api' }).use(authRouter).use(postRouter).compile()

export type App = typeof appRouter
