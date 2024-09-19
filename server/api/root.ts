import { createElysia } from '@/server/api/elysia'
import { authRouter } from '@/server/api/routes/auth'
import { postRouter } from '@/server/api/routes/post'

export const appRouter = createElysia({ prefix: '/api/elysia' })
  .use(authRouter)
  .use(postRouter)
  .compile()

export type AppRouter = typeof appRouter
