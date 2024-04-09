import type { Metadata, NextPage } from 'next'
import { Inter } from 'next/font/google'

import { Provider } from '@/components/provider'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'
import './globals.css'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = siteConfig.meta

const RootLayout: NextPage<React.PropsWithChildren> = ({ children }) => (
  <html lang="en" suppressHydrationWarning>
    <body className={cn('font-sans', inter.variable)}>
      <Provider>
        <Header />
        <main className="container flex-grow">{children}</main>
        <Toaster />
      </Provider>
    </body>
  </html>
)

export default RootLayout
