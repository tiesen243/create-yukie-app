import { treaty } from '@elysiajs/eden'

import { getBaseUrl } from '@/lib/site'
import { type App } from '@/server/root'

export const api = treaty<App>(getBaseUrl()).api
