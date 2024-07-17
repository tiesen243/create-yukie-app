import { appRouter } from '@/server/root'

const handler = appRouter.handle

export { handler as GET, handler as POST, handler as PATCH, handler as DELETE }
