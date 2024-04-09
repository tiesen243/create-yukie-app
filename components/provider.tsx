'use client'

import { ThemeProvider } from 'next-themes'
import { SWRConfig } from 'swr'
import { toast } from 'sonner'

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <SWRConfig
    value={{
      onError: (error: Error) => !error.fieldsError && toast.error(error.message),
      onSuccess: (data: Res) => data.message && toast.success(data.message),
    }}
  >
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  </SWRConfig>
)
