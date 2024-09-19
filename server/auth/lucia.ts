import 'server-only'

import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { type User } from '@prisma/client'
import { Discord } from 'arctic'
import { Lucia } from 'lucia'

import { env } from '@/env'
import { getBaseUrl } from '@/lib/utils'
import { db } from '@/server/db'

const adapter = new PrismaAdapter(db.session, db.user)

export const lucia = new Lucia(adapter, {
  sessionCookie: { expires: false, attributes: { secure: env.NODE_ENV === 'production' } },
  getUserAttributes: (attributes) => attributes,
})

export const discord = new Discord(
  env.DISCORD_CLIENT_ID,
  env.DISCORD_CLIENT_SECRET,
  `${getBaseUrl()}/api/auth/discord/callback`,
)

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: User
  }
}
