import Elysia, { type ElysiaConfig } from 'elysia'

import { db } from '@/prisma'
import { uncachedAuth } from '@/server/auth/uncached'

interface FieldError {
  path: string
  message: string
  schema: { error?: string }
}

export const createElysia = <P extends string, S extends boolean>(c?: ElysiaConfig<P, S>) =>
  new Elysia(c)
    .onError({ as: 'global' }, ({ error, code }) => {
      switch (code) {
        case 'VALIDATION':
          return {
            message: 'Validation error',
            fieldErrors: error.all.reduce((acc: Record<string, string>, x: FieldError) => {
              acc[String(x.path).slice(1)] = x.schema.error ?? x.message
              return acc
            }, {}) as Record<string, string>,
          }
        default:
          return { message: error.message }
      }
    })
    .derive({ as: 'global' }, async () => {
      const { user, session } = await uncachedAuth()

      return {
        db,
        user,
        session,
      }
    })
