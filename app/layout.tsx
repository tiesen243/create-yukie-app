import './globals.css'

import { Inter } from 'next/font/google'

import { Header } from '@/components/header'
import { Provider } from '@/components/provider'
import { Toaster } from '@/components/ui/sonner'
import { siteConfig } from '@/lib/site'

export const metadata = siteConfig.meta
export const viewport = siteConfig.viewport

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en" suppressHydrationWarning>
    <body className={`${inter.variable} font-sans`}>
      <Provider>
        <Header />
        <main className="container my-4">{children}</main>
        <Toaster />
      </Provider>
    </body>
  </html>
)

export default RootLayout
