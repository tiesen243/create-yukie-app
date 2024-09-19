import type { MetadataRoute } from 'next'

import { getBaseUrl } from '@/lib/utils'

interface Route {
  url: string
  lastModified: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch static routes
  const routesMap: Route[] = [''].map((route) => ({
    url: `${getBaseUrl()}/${route}`,
    lastModified: new Date().toISOString(),
  }))

  // Fetch dynamic routes
  let fetchedRoutes: Route[] = []
  try {
    fetchedRoutes = (await Promise.all([])).flat()
  } catch (error) {
    if (error instanceof Error) throw new Error(`Error fetching dynamic routes: ${error.message}`)
  }
  return [...routesMap, ...fetchedRoutes]
}
