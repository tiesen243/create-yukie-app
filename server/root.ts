import { createElysia } from '@/server/elysia'

import { authRouter } from '@/server/routes/auth'

export const appRouter = createElysia({ prefix: '/api' }).use(authRouter).compile()

export type App = typeof appRouter
