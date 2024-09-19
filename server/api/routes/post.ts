import { t } from 'elysia'

import { createElysia } from '@/server/api/elysia'

export const postRouter = createElysia({ prefix: '/post' })
  .get('/latestPost', async ({ db }) => {
    const post = await db.post.findFirst({ orderBy: { createdAt: 'desc' } })
    return post ?? null
  })

  .post(
    '/createPost',
    async ({ db, session, body: { content }, error }) => {
      if (!session) return error('Unauthorized', 'You must be logged in to create a post')

      const post = await db.post.create({
        data: { content, author: { connect: { id: session.user.id } } },
      })
      return post
    },
    { body: t.Object({ content: t.String() }) },
  )
