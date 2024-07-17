'use client'

import { XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { revalidate } from '@/server/actions'
import { useAuth } from '@/lib/auth'

export const DeleteBtn: React.FC<{ id: string }> = ({ id }) => {
  const { isAuthed } = useAuth()

  const handleDelete = async () => {
    await api.post.deletePost({ id }).delete()
    revalidate({ tag: 'posts' })
  }

  if (!isAuthed) return null

  return (
    <Button variant="ghost" size="icon" onClick={handleDelete} className="absolute right-2 top-2">
      <XIcon />
    </Button>
  )
}
