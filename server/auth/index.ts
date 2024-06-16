import { cache } from 'react'

import { uncachedAuth } from '@/server/auth/uncached'

export const auth = cache(uncachedAuth)
