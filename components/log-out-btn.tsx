'use client'

import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'

export const LogOutBtn: React.FC = async () => {
  const router = useRouter()
  const logOut = () => api.user['sign-out'].post().then(() => router.refresh())
  return (
    <Button variant="ghost" size="icon" onClick={logOut}>
      <LogOutIcon />
    </Button>
  )
}
