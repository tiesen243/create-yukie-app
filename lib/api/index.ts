import { treaty } from '@elysiajs/eden'

import type { AppRouter } from '@/server/api/root'
import { getBaseUrl } from '@/lib/utils'

export const api = treaty<AppRouter>(getBaseUrl()).api.elysia
