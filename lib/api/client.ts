import type { App } from '@/server/elysia'
import { treaty } from '@elysiajs/eden'

import { getBaseUrl } from '@/lib/site'

export const api = treaty<App>(getBaseUrl()).api.elysia
