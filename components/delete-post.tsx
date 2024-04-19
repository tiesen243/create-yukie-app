'use client'

import { XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'

export const DeletePost: React.FC<{ postId?: string }> = ({ postId }) => {
  const router = useRouter()
  const handleClick = async () => {
    await api.post.del.delete({ id: postId ?? '' })
    router.refresh()
  }
  return (
    <Button
      onClick={handleClick}
      className="absolute right-2 top-2 z-10"
      variant="ghost"
      size="icon"
    >
      <XIcon />
    </Button>
  )
}
