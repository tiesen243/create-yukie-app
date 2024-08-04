'use client'

import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { LogOutIcon } from 'lucide-react'

export const LogoutBtn: React.FC = () => {
  const router = useRouter()

  const handleClick = async () => {
    await api.auth.signout.post()
    router.push('/')
    router.refresh()
  }

  return (
    <Button variant="destructive" size="icon" onClick={handleClick}>
      <LogOutIcon />
    </Button>
  )
}
