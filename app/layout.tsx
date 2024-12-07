import '@/app/globals.css'

import { ThemeProvider } from 'next-themes'

import { ElysiaReactProvider } from '@/lib/elysia/react'
import { geistSans } from '@/lib/fonts'
import { seo } from '@/lib/seo'
import { cn } from '@/lib/utils'

export default ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" suppressHydrationWarning>
    <body className={cn('font-sans antialiased', geistSans.variable)}>
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
        <ElysiaReactProvider>{children}</ElysiaReactProvider>
      </ThemeProvider>
    </body>
  </html>
)

export const metadata = seo({})
