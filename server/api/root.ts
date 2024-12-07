import type { InferTreatyQueryInput, InferTreatyQueryOutput } from '@ap0nia/eden-react-query'
import { treaty } from '@elysiajs/eden'

import { elysia } from '@/server/api/elysia'
import { postRouter } from '@/server/api/routers/post'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
const baseAppRouter = elysia({ prefix: '' })
  // .use(edenPlugin({ batch: true, transformer: SuperJSON }))
  .use(postRouter)
const appRouter = elysia({ prefix: '/api/elysia' }).use(baseAppRouter)

// export type definition of API
type AppRouter = typeof baseAppRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const elysia = createCaller(createContext);
 * const res = await elysia.post.all();
 *       ^? Post[]
 */
const createCaller = treaty(appRouter)

/**
 * Inference helpers for input types
 * @example
 * type PostByIdInput = RouterInputs['post']['byId']
 *      ^? { id: number }
 **/
// @ts-expect-error - lgtm
type RouterInputs = InferTreatyQueryInput<AppRouter>

/**
 * Inference helpers for output types
 * @example
 * type AllPostsOutput = RouterOutputs['post']['all']
 *      ^? Post[]
 **/
// @ts-expect-error - lgtm
type RouterOutputs = InferTreatyQueryOutput<AppRouter>

export { appRouter, createCaller }
export type { AppRouter, RouterInputs, RouterOutputs }
