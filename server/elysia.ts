import Elysia, { type ElysiaConfig } from 'elysia'

import { uncachedAuth } from '@/server/auth/uncached'
import { db } from '@/prisma'

export const createContext = new Elysia()
  .derive(async () => {
    const { user, session } = await uncachedAuth()
    return { db, user, session }
  })
  .onError(({ error, code }) => {
    switch (code) {
      case 'VALIDATION':
        return {
          message: 'Validation error',
          fieldErrors: error.all.reduce((acc: Record<string, string>, x) => {
            acc[x.path.slice(1)] = String(x.schema.error ?? x.message)
            return acc
          }, {}),
        }
    }
  })
  .as('plugin')

export const createElysia = <P extends string, S extends boolean>(c?: ElysiaConfig<P, S>) =>
  new Elysia(c).use(createContext)
