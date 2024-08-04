import { appRouter } from '@/server/api/root'

const handler = appRouter.handle

export { handler as GET, handler as POST, handler as PATCH, handler as DELETE }
