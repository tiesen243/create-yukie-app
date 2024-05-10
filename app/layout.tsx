import type { Metadata, NextPage } from 'next'
import { Inter } from 'next/font/google'

import { Header } from '@/components/header'
import { Provider } from '@/components/provider'
import { Toaster } from '@/components/ui/sonner'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = siteConfig.metadata

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
