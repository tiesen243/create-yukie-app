'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

interface Params {
  path?: string
  tag?: string
}

export const revalidate = async ({ path, tag }: Params) => {
  if (path) revalidatePath(path)
  if (tag) revalidateTag(tag)
  return { success: true }
}
