'use client'

import { XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { revalidate } from '@/server/actions'

export const DeleteBtn: React.FC<{ id: string }> = ({ id }) => {
  const handleDelete = async () => {
    await api.post.deletePost({ id }).delete()
    revalidate({ tag: 'posts' })
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleDelete} className="absolute right-2 top-2">
      <XIcon />
    </Button>
  )
}
