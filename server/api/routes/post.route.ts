import { createElysia } from '@/server/api/elysia'
import { postModel } from '@/server/api/models/post.model'

export const postRoute = createElysia({ prefix: '/post', name: 'post.route' })
  .use(postModel)
  .get('/get-all', async ({ db, error }) => {
    const posts = await db.post.findMany({
      include: { author: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    })
    if (!posts) return error('Not Found', { message: 'No posts found' })

    return posts
  })
  .post(
    '/create',
    async ({ body, db, user, error }) => {
      if (!user) return error('Unauthorized', { message: 'You must be logged in' })

      const post = await db.post.create({ data: { ...body, author: { connect: { id: user.id } } } })
      if (!post) return error('Internal Server Error', { message: 'Failed to create post' })

      return { message: 'Post created' }
    },
    { body: 'create' },
  )
  .delete(
    '/del',
    async ({ body: { id }, db, user, error }) => {
      if (!user) return error('Unauthorized', { message: 'You must be logged in' })

      const post = await db.post.delete({ where: { id } })
      if (!post) return error('Not Found', { message: 'Post not found' })

      return { message: 'Post deleted' }
    },
    { body: 'del' },
  )
