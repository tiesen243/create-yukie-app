import type { NextRequest } from 'next/server'

import { appRouter } from '@/server/root'

const handler = (req: NextRequest) => appRouter.fetch(req)

export { handler as GET, handler as POST, handler as PATCH, handler as DELETE }
