'use server'

import { cookies } from 'next/headers'
import { lucia } from './auth/lucia'
import { revalidatePath, revalidateTag } from 'next/cache'

export const logout = async ({ id }: { id: string }) => {
  await lucia.invalidateSession(id)
  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}

interface Params {
  path?: string
  tag?: string
}
export const revalidate = async ({ path, tag }: Params) => {
  if (path) revalidatePath(path)
  if (tag) revalidateTag(tag)
  return
}
