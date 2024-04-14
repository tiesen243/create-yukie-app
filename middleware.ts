import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const middleware = async (request: NextRequest): Promise<NextResponse> => {
  const cookie = request.cookies.get('auth_session')
  if (!cookie) return NextResponse.redirect(new URL('/auth/login', request.nextUrl))

  return NextResponse.next()
}

export const config = {
  matcher: ['/middleware'],
}
