'use client'

import type { QueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createEdenTreatyReactQuery, httpBatchLink } from '@ap0nia/eden-react-query'
import { QueryClientProvider } from '@tanstack/react-query'

import type { AppRouter } from '@/server/api/root'
import { createQueryClient } from '@/lib/elysia/query-client'
import { getBaseUrl } from '@/lib/utils'

let clientQueryClientSingleton: QueryClient | undefined = undefined
const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return createQueryClient()
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient())
}

// @ts-expect-error - lgtm
export const api = createEdenTreatyReactQuery<AppRouter>({ abortOnUnmount: true })

export const ElysiaReactProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const queryClient = getQueryClient()

  const [elysiaClient] = useState(() =>
    api.createClient({
      links: [
        // @ts-expect-error - lgtm
        httpBatchLink({
          domain: getBaseUrl() + '/api/elysia',
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={elysiaClient} queryClient={queryClient}>
        {children}
      </api.Provider>
    </QueryClientProvider>
  )
}
