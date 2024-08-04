import './globals.css'

import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'

import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { SessionProvider } from '@/lib/session'
import { siteConfig } from '@/lib/site'
import { auth } from '@/server/auth'

export const metadata = siteConfig.meta
export const viewport = siteConfig.viewport

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const RootLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const { user, session } = await auth()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <SessionProvider user={user} session={session}>
            <Header />
            <main className="container my-4">{children}</main>
            <Toaster richColors />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
