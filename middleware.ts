import { NextResponse, type MiddlewareConfig, type NextRequest } from 'next/server'

import { uncachedAuth } from '@/server/auth/uncached'

export const middleware = async (req: NextRequest) => {
  const { user } = await uncachedAuth()

  if (!user) return NextResponse.redirect(new URL('/login', req.nextUrl))

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: ['/protected'],
}
