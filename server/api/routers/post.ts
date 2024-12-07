import { t } from 'elysia'

import { createElysiaRouter } from '@/server/api/elysia'

export const postRouter = createElysiaRouter({ prefix: '/post' })
  .get('/getLatestPost', async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: 'desc' },
    })

    return post ?? null
  })
  .onBeforeHandle(async ({ ctx, error }) => {
    const session = await ctx.session()
    if (!session) return error('Unauthorized')
  })
  .post(
    '/createPost',
    async ({ ctx, body }) => {
      const session = await ctx.session()
      return ctx.db.post.create({
        data: { content: body.content, author: { connect: { id: session?.userId } } },
      })
    },
    {
      body: t.Object({ content: t.String() }),
    },
  )
