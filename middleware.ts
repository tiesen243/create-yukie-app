import { NextRequest, NextResponse } from 'next/server'

import { validateCookie } from '@/server/auth'

export const middleware = async (req: NextRequest) => {
  const cookie = req.cookies.get('auth_session')
  const { user } = await validateCookie(`${cookie?.name}=${cookie?.value}`)
  if (!user) return NextResponse.redirect(new URL('/auth/login', req.url))
}

export const config = {
  matcher: ['/middleware'],
}
