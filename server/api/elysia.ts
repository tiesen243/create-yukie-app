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

import { db } from '@/server/db'
import { auth } from '../auth'

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
export const createElysiaContext = new Elysia().decorate('ctx', { db, session: auth }).as('plugin')

/**
 * 2. INITIALIZATION
 *
 * This is where the elysia API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
export const elysia = <P extends string, S extends boolean>(options?: ElysiaConfig<P, S>) =>
  new Elysia(options).use(createElysiaContext)

/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timmingMiddleware = new Elysia()
  .state({ start: 0 })
  .onBeforeHandle(({ store }) => (store.start = Date.now()))
  .onAfterHandle(({ path, store: { start } }) =>
    console.log(`[Elysia] ${path} took ${Date.now() - start}ms to execute`),
  )
  .as('plugin')

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your elysia API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */
export const createElysiaRouter = <P extends string, S extends boolean>(
  options?: ElysiaConfig<P, S>,
) => elysia(options).use(timmingMiddleware)
