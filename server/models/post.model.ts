import Elysia, { t } from 'elysia'

const CreatePost = t.Object({
  content: t.String({ minLength: 4, error: 'Content must be at least 4 characters' }),
})

export const PostModel = new Elysia({ name: 'Model.Post' }).model({ CreatePost })
