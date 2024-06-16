import Elysia, { t } from 'elysia'

export const register = t.Object({
  name: t.String(),
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 8 }),
  confirmPassword: t.String({ minLength: 8 }),
})

export const login = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 8 }),
})

export const authModel = new Elysia({ name: 'auth.model' }).model({ register, login })
