import '@/app/globals.css'

import { Geist } from 'next/font/google'

import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'
import { createMetadata } from '@/lib/metadata'
import { cn } from '@/lib/utils'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" suppressHydrationWarning>
    <body className={cn('min-h-dvh font-sans antialiased', geistSans.variable)}>
      <Providers>
        {children}
        <Toaster />
      </Providers>
    </body>
  </html>
)

export default RootLayout

export const metadata = createMetadata({})
