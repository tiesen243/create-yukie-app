'use client'

import { XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { revalidate } from '@/server/actions'
import { useSession } from '@/lib/session'

export const DeleteBtn: React.FC<{ id: string; uid: string }> = ({ id, uid }) => {
  const { isAuthed, user } = useSession()
  if (!isAuthed) return null
  if (user.id !== uid) return null

  const handleDelete = async () => {
    await api.post.deletePost({ id }).delete()
    revalidate({ path: '/' })
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleDelete}>
      <XIcon />
    </Button>
  )
}
