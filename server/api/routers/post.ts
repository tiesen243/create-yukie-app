import { t } from 'elysia'

import { createElysiaRouter } from '@/server/api/elysia'

export const postRouter = createElysiaRouter({ prefix: '/post' })
  .get('/getLatestPost', async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: 'desc' },
    })
    return post ?? null
  })
  .onBeforeHandle(({ ctx, error }) => {
    if (!ctx.session) return error('Unauthorized')
  })
  .post(
    '/createPost',
    async ({ ctx, body }) => {
      return ctx.db.post.create({
        data: { content: body.content, author: { connect: { id: ctx.session?.userId } } },
      })
    },
    {
      body: t.Object({ content: t.String() }),
    },
  )
