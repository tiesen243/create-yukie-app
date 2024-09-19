import { headers } from 'next/headers'
import { cache } from 'react'
import { treaty } from '@elysiajs/eden'

import type { AppRouter } from '@/server/api/root'
import { getBaseUrl } from '@/lib/utils'

const createContext = cache(async () => {
  const heads = new Headers(headers())
  heads.set('x-elysia-source', 'eden')

  return {
    headers: heads,
  }
})

export const api = treaty<AppRouter>(getBaseUrl(), await createContext()).api.elysia
