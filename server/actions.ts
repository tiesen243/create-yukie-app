'use server'

import { cookies } from 'next/headers'

import { lucia } from '@/server/auth/lucia'

export const logout = async () => {
  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}
