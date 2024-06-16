import { createElysia } from './elysia'

/* Import routes */
import { authRoute } from './routes/auth.route'
import { postRoute } from './routes/post.route'

export const appRouter = createElysia({ prefix: '/api' }).use(authRoute).use(postRoute).compile()

export type App = typeof appRouter
