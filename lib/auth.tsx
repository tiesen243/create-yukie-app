'use client'

import type { Session, User } from '@prisma/client'
import { createContext, use, useEffect, useState } from 'react'

type Auth =
  | { isAuthed: true; user: User; session: Session; mutate: () => Promise<void> }
  | { isAuthed: false; user: null; session: null; mutate: () => Promise<void> }

const initialState: Auth = {
  user: null,
  session: null,
  isAuthed: false,
  mutate: () => Promise.resolve(),
}

const authContext = createContext<Auth>(initialState)

export const useAuth = () => {
  const context = use(authContext)

  if (!context) throw new Error('useAuth must be used within an AuthProvider')

  return context
}

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<Auth>(initialState)

  const mutate = async () => {
    const res = await fetch('/api/auth', { next: { tags: ['auth'] } })
    const payload = (await res.json()) as Auth

    setState(payload)
  }

  useEffect(() => {
    mutate()
  }, [])

  return <authContext.Provider value={{ ...state, mutate }}>{children}</authContext.Provider>
}

authContext.displayName = 'AuthContext'
