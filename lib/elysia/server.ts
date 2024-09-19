import { treaty } from '@elysiajs/eden'

import { appRouter } from '@/server/api/root'

export const api = treaty(appRouter).api.elysia
