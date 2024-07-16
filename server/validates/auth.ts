import Elysia, { t, type Static } from 'elysia'

const signupSchema = t.Object({
  name: t.String({ minLength: 1, error: 'Name is required.' }),
  email: t.String({ format: 'email', error: 'Invalid email.' }),
  password: t.String({
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    error:
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.',
  }),
  confirmPassword: t.String({ minLength: 1, error: 'Confirm password is required.' }),
})

export type SignupSchema = Static<typeof signupSchema>

const signinSchema = t.Object({
  email: t.String(),
  password: t.String(),
})

export type SigninSchema = Static<typeof signinSchema>

export const authSchema = new Elysia({ name: 'auth.schema' }).model({ signupSchema, signinSchema })
