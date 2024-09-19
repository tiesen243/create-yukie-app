import { createElysia } from '@/server/api/elysia'
import { postRouter } from '@/server/api/routes/post'

export const appRouter = createElysia({ prefix: '/api/elysia' }).use(postRouter).compile()

export type AppRouter = typeof appRouter
