import Elysia from 'elysia'

import { authMiddleware } from '@/server/auth'
import { PostModel } from '@/server/models/post.model'
import { db } from '@/prisma'

export const PostRoute = new Elysia({ name: 'Route.Post', prefix: '/post' })
  // TODO: set up
  .use(PostModel)

  .get('/all', async ({ error }) => {
    const posts = await db.post.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        content: true,
        author: { select: { id: true, name: true } },
      },
    })
    if (!posts || posts.length === 0) return error(404, { message: 'No posts found' })
    return posts
  })

  // NOTE: This route requires authentication
  .use(authMiddleware)
  .post(
    '/create',
    async ({ user, body: { content }, error }) => {
      const post = await db.post.create({
        data: { content, author: { connect: { id: user?.id } } },
      })
      if (!post) return error(500, { message: 'Failed to create post' })
      return { message: 'Post created successfully' }
    },
    { body: 'CreatePost' },
  )

  .delete('/del/:id', async ({ params: { id }, user, error }) => {
    const post = await db.post.findUnique({ where: { id } })
    if (!post) return error(404, { message: 'Post not found' })

    if (post.authorId !== user?.id)
      return error(403, { message: 'You are not authorized to delete this post' })

    await db.post.delete({ where: { id } })
    return { message: 'Post deleted successfully' }
  })
