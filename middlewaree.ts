import { NextRequest, NextResponse } from 'next/server'

export const middleware = async (req: NextRequest) => {
  const session = req.cookies.get('auth_session')
  if (!session) return NextResponse.redirect(new URL('/auth/login', req.url))
}

export const config = {
  matcher: ['/middleware'],
}
