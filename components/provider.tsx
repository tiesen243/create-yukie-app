'use client'

import {
  defaultShouldDehydrateQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'

import { AuthProvider } from '@/lib/auth'

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 30 * 1000 },
          dehydrate: {
            shouldDehydrateQuery: (query) =>
              defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
