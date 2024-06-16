import { env } from '@/env'
import type { Metadata, Viewport } from 'next'

export type SiteConfig = {
  meta: Metadata
  viewport: Viewport
}

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin
  if (env.NEXT_PUBLIC_APP_URL) return `https://${env.NEXT_PUBLIC_APP_URL}`
  return 'http://localhost:3000'
}

export const siteConfig: SiteConfig = {
  meta: {
    metadataBase: new URL(getBaseUrl()),
    title: 'Next.js Elysia',
    applicationName: 'Next.js Elysia',
    description: 'Next.js Elysia Starter Template with TypeScript, Tailwind CSS',
    openGraph: { images: ['/og'] },
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
  },
  viewport: {
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'hsl(0 0% 100%)' },
      { media: '(prefers-color-scheme: dark)', color: 'hsl(240 10% 3.9%)' },
    ],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}
