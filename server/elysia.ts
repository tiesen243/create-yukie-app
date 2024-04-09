import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'

import { UserRoute } from '@/server/routes/user.route'
import { PostRoute } from './routes/post.route'

const app = new Elysia({ prefix: '/api/elysia' })
  // TODO: Add swagger documentation
  .use(
    swagger({
      path: '/docs',
      documentation: {
        info: { title: 'Next.js + ElysiaJS', version: '1.0.0' },
        tags: [
          { name: 'User', description: 'User operations' },
          { name: 'Post', description: 'Post operations' },
        ],
      },
    }),
  )

  // TODO: Format error response
  .onError(({ error, code }) => {
    switch (code) {
      case 'VALIDATION':
        return {
          message: 'Validation error',
          fieldsError: error.all.reduce(
            (acc, x) => {
              acc[String(x.path).slice(1)] = x.schema.error ?? x.message
              return acc
            },
            {} as Record<string, string>,
          ),
        }
      default:
        return { message: error.message }
    }
  })

  // TODO: Add routes
  .get('/', () => ({ message: 'Hello World!' }))
  .use(UserRoute)
  .use(PostRoute)

  .compile()

const handler = app.handle

export { handler as DELETE, handler as GET, handler as PATCH, handler as POST }

export type App = typeof app
