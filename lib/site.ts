export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin
  if (process.env.VERCEL_URL) return `https://next-elysia.vercel.app`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const siteConfig = {
  metadata: {
    metadataBase: new URL(getBaseUrl()),
    title: {
      default: 'Next Elysia',
      template: '%s | Next Elysia',
    },
    description: 'Get started with Next.js and Elysia',
    keywords: ['next.js', 'elysiajs', 'typescript', 'tailwindcss'],
    openGraph: { images: '/og', url: getBaseUrl() },
    twitter: { card: 'summary_large_image', images: '/og' },
    icons: { icon: '/favicon.ico' },
    alternates: { canonical: getBaseUrl() },
  },
}
