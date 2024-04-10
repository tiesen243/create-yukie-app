import Elysia from 'elysia'

import { context } from '@/server/plugins'
import { postModel } from '@/server/models/post.model'

export const postRoute = new Elysia({ name: 'Route.Post', prefix: '/post' })
  .use(context)
  .use(postModel)

  .get('/getAll', async ({ db, error }) => {
    const posts = await db.post.findMany({
      include: { author: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    })
    if (!posts) return error(404, { message: 'No posts found' })
    return posts
  })

  .onBeforeHandle({ as: 'scoped' }, ({ session, user, error }) => {
    if (!session || !user) return error(401, { message: 'Unauthorized' })
  })

  .post(
    '/create',
    async ({ db, body: { content }, user, error }) => {
      const newPost = await db.post.create({
        data: { content, author: { connect: { id: user?.id } } },
      })
      if (!newPost) return error(500, { message: 'Failed to create post' })
      return { message: 'Post created successfully' }
    },
    { body: 'createPost' },
  )

  .delete(
    '/del',
    async ({ db, body: { id }, error }) => {
      const post = await db.post.findUnique({ where: { id } })
      if (!post) return error(404, { message: 'Post not found' })
      await db.post.delete({ where: { id } })
      return { message: 'Post deleted successfully' }
    },
    { body: 'deletePost' },
  )
