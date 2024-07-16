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
