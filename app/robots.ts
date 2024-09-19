import { type MetadataRoute } from 'next'

import { getBaseUrl } from '@/lib/utils'

const robots = (): MetadataRoute.Robots => ({
  rules: [{ userAgent: '*' }],
  sitemap: `${getBaseUrl()}/sitemap.xml`,
  host: getBaseUrl(),
})

export default robots
