import { createElysia } from '../elysia'

export const postRouter = createElysia({ prefix: '/post' }).get('/', async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    message: 'Hello, World!',
  }
})
