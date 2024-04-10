import { PrismaClient } from '@prisma/client'

const prisma = () =>
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

const globalForPrisma = globalThis as any as {
  prisma: ReturnType<typeof prisma> | undefined
}

export const db = globalForPrisma.prisma || prisma()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
