import type { ElysiaConfig } from 'elysia'
import Elysia from 'elysia'

import { auth } from '@/server/auth'
import { db } from '@/server/db'

const createContext = new Elysia()
  .derive(async () => {
    const session = await auth()

    return { db, session }
  })
  .as('plugin')

const timmingMiddleware = new Elysia()
  .state({ start: 0 })
  .onBeforeHandle(({ store }) => (store.start = Date.now()))
  .onAfterHandle(({ path, store: { start } }) =>
    console.log(`[Elysia] ${path} took ${Date.now() - start}ms to execute`),
  )
  .as('plugin')

export const createElysia = <P extends string, S extends boolean>(options?: ElysiaConfig<P, S>) =>
  new Elysia({
    ...options,
    aot: true,
  })
    .use(createContext)
    .use(timmingMiddleware)
