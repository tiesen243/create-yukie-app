import Elysia, { t } from 'elysia'

const signUp = t.Object({
  name: t.String({ minLength: 4, error: 'Name must be at least 4 characters' }),
  email: t.String({ format: 'email', error: 'Email is invalid' }),
  password: t.RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    minLength: 8,
    error:
      'Password must contain at least 8 characters, including at least one letter and one number and special character',
  }),
  confirmPassword: t.String(),
})

const signIn = t.Omit(signUp, ['name', 'confirmPassword'])

export const userModel = new Elysia({ name: 'Model.User' }).model({ signUp, signIn })
