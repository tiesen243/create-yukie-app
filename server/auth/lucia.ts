import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import type { User } from '@prisma/client'
import { Lucia } from 'lucia'

import { env } from '@/env'
import { db } from '@/server/db'

const adapter = new PrismaAdapter(db.session, db.user)

export const lucia = new Lucia(adapter, {
  sessionCookie: { expires: false, attributes: { secure: env.NODE_ENV === 'production' } },
  getUserAttributes: (attr) => attr,
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: User
  }
}
