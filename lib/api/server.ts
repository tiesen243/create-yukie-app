import type { App } from '@/server/elysia'
import { treaty } from '@elysiajs/eden'
import { headers } from 'next/headers'

import { getBaseUrl } from '@/lib/site'

export const api = treaty<App>(getBaseUrl(), { headers: headers() }).api.elysia

/*
 * I dont know why it's not working when building the app
 * and throwing an error like this:
 * Invariant: headers() expects to have requestAsyncStorage, none available.
 * But it's working fine when running the app in development mode.
 */
