'use client'

import type { Session, User } from '@prisma/client'
import { createContext, useContext } from 'react'

type SessionContext =
  | {
      isAuthed: false
      user: null
      session: null
    }
  | {
      isAuthed: true
      user: User
      session: Session
    }

const sessionContext = createContext<SessionContext>({
  isAuthed: false,
  user: null,
  session: null,
})

export const SessionProvider: React.FC<{
  children: React.ReactNode
  user: User | null
  session: Session | null
}> = ({ children, user, session }) => {
  const isAuthed = user !== null && session !== null
  const value = isAuthed ? { isAuthed, user, session } : { isAuthed, user: null, session: null }

  return <sessionContext.Provider value={value}>{children}</sessionContext.Provider>
}

export const useSession = () => {
  const context = useContext(sessionContext)
  if (!context) throw new Error('useSession must be used within a SessionProvider')
  return context
}
