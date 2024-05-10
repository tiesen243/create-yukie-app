import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  // Server environment variables
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    POSTGRES_URL: z.string(),
    POSTGRES_PRISMA_URL: z.string(),
    POSTGRES_URL_NO_SSL: z.string(),
    POSTGRES_URL_NON_POOLING: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_HOST: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DATABASE: z.string(),
  },

  // Client environment variables
  client: {},

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL_NO_SSL: process.env.POSTGRES_URL_NO_SSL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})
