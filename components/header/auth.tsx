'use client'

import Link from 'next/link'

import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import { LogOutIcon } from 'lucide-react'

export const Auth: React.FC = () => {
  const { session, user, mutate } = useAuth()

  if (!session || !user) return <Link href="/sign-in">Login</Link>

  const handleLogout = async () => {
    await api.auth.signout.post()
    mutate()
  }

  return (
    <>
      <p className="mr-2 text-lg">Welcome, {user.name}</p>

      <button onClick={handleLogout}>
        <LogOutIcon />
      </button>
    </>
  )
}
