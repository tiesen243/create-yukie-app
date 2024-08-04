import Elysia, { t } from 'elysia'

const signupSchema = t.Object({
  name: t.String(),
  email: t.String(),
  password: t.String(),
})

const signinSchema = t.Object({
  email: t.String(),
  password: t.String(),
})

export const authSchema = new Elysia({ name: 'auth.schema' }).model({ signupSchema, signinSchema })

// pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
