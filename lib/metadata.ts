import type { Metadata } from 'next'

import { getBaseUrl } from '@/lib/utils'

export const createMetadata = (
  override: Omit<Metadata, 'title'> & { title?: string },
): Metadata => {
  const siteName = 'Create Yukie App'

  const url = override.openGraph?.url
    ? `${getBaseUrl()}${override.openGraph.url}`
    : getBaseUrl()
  const images = [
    ...((override.openGraph?.images as [] | null) ?? []),
    'https://tiesen.id.vn/api/og', // Or create your own API route to generate OG images in `/app/api/og`
  ]

  return {
    ...override,
    metadataBase: new URL(getBaseUrl()),
    title: override.title ? `${siteName} | ${override.title}` : siteName,
    description:
      override.description ??
      'Create Yukie App is a starter template for Next.js and ElysiaJS with TypeScript, Tailwind CSS, and React Query.',
    applicationName: siteName,
    alternates: { canonical: url },
    twitter: { card: 'summary_large_image' },
    openGraph: { url, images, siteName, type: 'website', ...override.openGraph },
    icons: {
      // Replace with your own icons
      icon: 'https://tiesen.id.vn/favicon.ico',
      shortcut: 'https://tiesen.id.vn/favicon-16x16.png',
      apple: 'https://tiesen.id.vn/apple-touch-icon.png',
    },
  }
}
