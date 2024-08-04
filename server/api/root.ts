import { createElysia } from '@/server/api/elysia'

import { authRouter } from '@/server/api/routers/auth'
import { postRouter } from '@/server/api/routers/post'

export const appRouter = createElysia({ prefix: '/api' }).use(authRouter).use(postRouter).compile()

export type App = typeof appRouter
