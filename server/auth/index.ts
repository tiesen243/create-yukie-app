import type { Session, User } from '@prisma/client'
import { sha256 } from '@oslojs/crypto/sha2'
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding'

import { db } from '@/server/db'

const EXPIRES_IN = 1000 * 60 * 60 * 24 * 30

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  const token = encodeBase32LowerCaseNoPadding(bytes)
  return token
}

export const createSession = async (token: string, userId: string): Promise<Session> => {
  const session = {
    sessionToken: encodeHexLowerCase(sha256(new TextEncoder().encode(token))),
    expiresAt: new Date(Date.now() + EXPIRES_IN),
    user: { connect: { id: userId } },
  }

  return await db.session.create({ data: session })
}

export const validateSessionToken = async (token: string): Promise<SessionValidation> => {
  const sessionToken = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const result = await db.session.findUnique({
    where: { sessionToken },
    include: { user: true },
  })
  if (!result) return { expires: new Date(Date.now()) }

  const { user, ...session } = result
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.session.delete({ where: { sessionToken } })
    return { expires: new Date(Date.now()) }
  }

  if (Date.now() >= session.expiresAt.getTime() - EXPIRES_IN / 2) {
    session.expiresAt = new Date(Date.now() + EXPIRES_IN)
    await db.session.update({
      where: { sessionToken },
      data: { expiresAt: session.expiresAt },
    })
  }

  return { user, expires: session.createdAt }
}

export const invalidateSession = async (token: string): Promise<void> => {
  const sessionToken = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  await db.session.delete({ where: { sessionToken } })
}

export interface SessionValidation {
  user?: User
  expires: Date
}
