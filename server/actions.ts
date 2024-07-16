'use server'

import { cookies } from 'next/headers'
import { lucia } from './auth/lucia'

export const logout = async ({ id }: { id: string }) => {
  await lucia.invalidateSession(id)
  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}
