import { t } from 'elysia'

import { createElysiaRouter } from '@/server/api/elysia'

export const postRouter = createElysiaRouter({ prefix: '/post' })
  .get('/all', async ({ ctx }) => {
    return ctx.db.post.findMany({ orderBy: { createdAt: 'desc' } })
  })
  .get('/byId/:id', async ({ ctx, params }) => {
    return ctx.db.post.findUnique({ where: { id: params.id } })
  })
  .post(
    '/create',
    async ({ ctx, body, error }) => {
      if (!ctx.session.user)
        return error('Unauthorized', 'You must be logged in to create a post')

      return ctx.db.post.create({
        data: { ...body, user: { connect: { id: ctx.session.user.id } } },
      })
    },
    {
      body: t.Object({
        title: t.String({ minLength: 1, error: 'Title is required' }),
        content: t.String({ minLength: 1, error: 'Content is required' }),
      }),
    },
  )
  .post('/remove/:id', async ({ ctx, params, error }) => {
    if (!ctx.session.user)
      return error('Unauthorized', 'You must be logged in to create a post')

    return ctx.db.post.delete({ where: { id: params.id } })
  })
