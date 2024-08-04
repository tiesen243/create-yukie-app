import Elysia, { t } from 'elysia'

const createPostSchema = t.Object({
  content: t.String(),
})

export const postSchema = new Elysia({ name: 'post.schema' }).model({ createPostSchema })
