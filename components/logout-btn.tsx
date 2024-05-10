'use client'

import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'

export const LogoutBtn: React.FC = () => {
  const router = useRouter()
  const handleClick = async () => {
    await api.user['sign-out'].post()
    toast.success('Logged out successfully')
    router.refresh()
  }
  return (
    <Button variant="ghost" size="icon" onClick={handleClick}>
      <LogOutIcon size={20} />
    </Button>
  )
}
