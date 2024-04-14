import Elysia from 'elysia'

import { db } from '@/prisma'
import { uncachedAuth } from '@/server/auth'

export const context = new Elysia({ name: 'App.Context' })
  .onError({ as: 'global' }, ({ error, code }) => {
    switch (code) {
      case 'VALIDATION':
        return {
          message: 'Validation error',
          fieldErrors: error.all.reduce(
            (acc, x) => {
              acc[String(x.path).slice(1)] = x.schema.error ?? x.message
              return acc
            },
            {} as Record<string, string>,
          ),
        }
      default:
        return { message: error.message }
    }
  })
  .derive({ as: 'global' }, async () => {
    const { session, user } = await uncachedAuth()
    return { session, user, db }
  })
