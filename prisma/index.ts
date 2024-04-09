import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'

const prisma = () =>
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

const globalForPrisma = globalThis as any as {
  prisma: ReturnType<typeof prisma> | undefined
}

export const db = globalForPrisma.prisma || prisma()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

export const adapter = new PrismaAdapter(db.session, db.user)
