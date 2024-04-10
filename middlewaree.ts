import { NextRequest, NextResponse } from 'next/server'

export const middleware = async (req: NextRequest) => {
  const session = req.cookies.get('auth_session')
  if (!session) return NextResponse.redirect(new URL('/auth/login', req.url))
}

export const config = {
  matcher: ['/middleware'],
}

/* ERROR: Cross-reference between Middleware and Edge Function
 * Dont know why this error is coming when deploying the project to Vercel
 */
