'use client'

import { AuthProvider } from '@/lib/auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [client] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
