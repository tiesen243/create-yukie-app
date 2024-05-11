'use client'

import { XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { revalidate } from '@/lib/revalidate'

export const DeletePost: React.FC<{ postId: string }> = ({ postId }) => {
  const handleClick = async () => {
    await api.post['delete-post'].delete({ id: postId })
    revalidate('posts')
  }
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute right-2 top-2 z-10"
      onClick={handleClick}
    >
      <XIcon size={24} />
    </Button>
  )
}
