import { createElysia } from '@/server/elysia'

import { authRouter } from '@/server/routers/auth'
import { postRouter } from '@/server/routers/post'

export const appRouter = createElysia({ prefix: '/api' }).use(authRouter).use(postRouter).compile()

export type App = typeof appRouter
