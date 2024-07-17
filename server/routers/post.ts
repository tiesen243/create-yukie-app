import { createElysia } from '../elysia'
import { postSchema } from '../validates/post'

export const postRouter = createElysia({ prefix: '/post' })
  .use(postSchema)

  .get('/getPosts', async ({ db, error }) => {
    const posts = await db.post.findMany({
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    })
    if (!posts) return error('Internal Server Error', 'Failed to fetch posts.')
    return posts
  })

  .post(
    '/create',
    async ({ user, db, body, error }) => {
      if (!user) return error('Unauthorized', 'You must be logged in to create a post.')

      const newPost = await db.post.create({
        data: {
          ...body,
          author: { connect: { id: user?.id } },
        },
      })
      if (!newPost) return error('Internal Server Error', 'Failed to create post.')
      return newPost
    },
    { body: 'createPostSchema' },
  )

  .delete('/deletePost/:id', async ({ user, db, params, error }) => {
    if (!user) return error('Unauthorized', 'You must be logged in to delete a post.')

    const post = await db.post.findUnique({ where: { id: params.id } })
    if (!post) return error('Not Found', 'Post not found.')

    if (post.authorId !== user.id)
      return error('Forbidden', 'You do not have permission to delete this post.')

    await db.post.delete({ where: { id: params.id } })

    return { message: 'Post deleted successfully.' }
  })
