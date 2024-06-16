import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { auth } from '@/server/auth'

export const DeletePost: React.FC<{ id: string; userId: string }> = async ({ id, userId }) => {
  const { user } = await auth()
  if (user && user.id !== userId) return null

  const action = async (_: FormData) => {
    'use server'
    await api.post.del.delete({ id }, { headers: { cookie: cookies() } })
    revalidateTag('posts')
  }
  return (
    <form action={action}>
      <Button variant="destructive" className="w-full">
        Delete
      </Button>
    </form>
  )
}
