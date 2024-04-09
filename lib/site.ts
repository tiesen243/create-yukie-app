export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const siteConfig = {
  meta: {
    metadataBase: new URL(getBaseUrl()),
    title: {
      default: 'Next Elysia',
      template: '%s | Next Elysia',
    },
    description: 'Get started with Next.js and Elysia',
    openGraph: { images: '/og.png' },
    twitter: {
      site: '@tiesen243',
      card: 'summary_large_image',
      images: '/og.png',
    },
    icons: { icon: '/favicon.ico' },
    alternates: { canonical: getBaseUrl() },
  },
}
