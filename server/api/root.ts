import { treaty } from '@elysiajs/eden'

import { elysia } from '@/server/api/elysia'
import { postRouter } from '@/server/api/routers/post'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

const appRouter = elysia({ prefix: '/api/elysia' }).use(postRouter)

// export type definition of API
type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const elysia = createCaller(createContext);
 * const res = await elysia.post.all();
 *       ^? Post[]
 */
const createCaller = treaty(appRouter).api.elysia

export { appRouter, createCaller }
export type { AppRouter }
