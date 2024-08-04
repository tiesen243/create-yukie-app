import Elysia, { type ElysiaConfig } from 'elysia'

import { uncachedAuth } from '@/server/auth/uncached'
import { db } from '@/server/db'

const createContext = new Elysia()
  .derive(async () => {
    const { user, session } = await uncachedAuth()
    return { db, user, session }
  })
  .as('plugin')

export const createElysia = <P extends string, S extends boolean>(c?: ElysiaConfig<P, S>) =>
  new Elysia(c).use(createContext)
