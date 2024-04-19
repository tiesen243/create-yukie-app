import { NextRequest, NextResponse } from 'next/server'

export const middleware = (req: NextRequest) => {
  const auth_session = req.cookies.get('auth_session')
  if (!auth_session) return NextResponse.redirect(new URL('/auth/login', req.nextUrl).toString())

  return NextResponse.next()
}

export const config = {
  matcher: ['/middleware'],
}
