/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

import type { ElysiaConfig } from 'elysia'
import Elysia from 'elysia'

import { auth } from '@/server/auth'
import { db } from '@/server/db'

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createElysiaContext = new Elysia()
  .derive(async () => {
    const session = await auth()

    return { ctx: { db, session } }
  })
  .decorate('ctx', { db })
  .as('plugin')

/**
 * 2. INITIALIZATION
 *
 * This is where the elysia API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
export const elysia = <P extends string>(options?: ElysiaConfig<P>) =>
  new Elysia(options).use(createElysiaContext).onError(({ code, error }) => {
    switch (code) {
      case 'VALIDATION': {
        const formattedErrors = error.all.reduce(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (acc: Record<string, string>, err: any) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            acc[err.path.slice(1)] = err.schema.error ?? err.message
            return acc
          },
          {},
        )

        return formattedErrors
      }
      default:
        return 'Unknown error'
    }
  })

/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timmingMiddleware = new Elysia()
  .state({ start: 0 })
  .onBeforeHandle(({ store }) => (store.start = Date.now()))
  .onAfterHandle(({ path, store: { start } }) => {
    console.log(`[Elysia] ${path} took ${Date.now() - start}ms to execute`)
  })
  .as('plugin')

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your elysia API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */
export const createElysiaRouter = <P extends string>(options?: ElysiaConfig<P>) =>
  elysia(options).use(timmingMiddleware)
