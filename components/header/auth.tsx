'use client'

import Link from 'next/link'

import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth'

export const Auth: React.FC = () => {
  const { session, user, mutate } = useAuth()

  if (!session || !user) return <Link href="/sign-in">Login</Link>

  const handleLogout = async () => {
    await api.auth.signout.post()
    mutate()
  }

  return <button onClick={handleLogout}>Welcome, {user.name}</button>
}
