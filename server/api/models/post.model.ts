import Elysia, { t } from 'elysia'

const create = t.Object({
  title: t.String({ minLength: 4 }),
  content: t.String({ minLength: 4 }),
})

const del = t.Object({
  id: t.String(),
})

export const postModel = new Elysia({ name: 'post.model' }).model({ create, del })
