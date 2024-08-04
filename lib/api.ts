import { treaty } from '@elysiajs/eden'

import { getBaseUrl } from '@/lib/site'
import { type App } from '@/server/api/root'

export const api = treaty<App>(getBaseUrl()).api
