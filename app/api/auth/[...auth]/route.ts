import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { OAuth2RequestError } from 'arctic'
import { env } from 'elysia'

import { createSession, generateSessionToken } from '@/server/auth'
import { OAuth } from '@/server/auth/oauth'

// export const runtime = 'edge'

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ auth: [string, string] }> },
) => {
  const nextUrl = new URL(req.url)

  const [provider, isCallback] = (await params).auth
  const callbackUrl = `${nextUrl.origin}/api/auth/${provider}/callback`

  const authProvider = new OAuth(provider, callbackUrl)

  if (!isCallback) {
    const { url, state } = authProvider.getOAuthUrl()
    ;(await cookies()).set('oauth_state', state)

    return NextResponse.redirect(new URL(`${url}`, nextUrl))
  }

  try {
    const code = nextUrl.searchParams.get('code') ?? ''
    const state = nextUrl.searchParams.get('state') ?? ''
    const storedState = req.cookies.get('oauth_state')?.value ?? ''
    ;(await cookies()).delete('oauth_state')

    if (!code || !state || state !== storedState) throw new Error('Invalid state')

    const user = await authProvider.callback(code)
    const token = await generateSessionToken()
    const session = await createSession(token, user.id)
    ;(await cookies()).set('auth_token', token, {
      httpOnly: true,
      path: '/',
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: session.expiresAt,
    })

    return NextResponse.redirect(new URL('/', nextUrl))
  } catch (e) {
    if (e instanceof OAuth2RequestError)
      return NextResponse.json({ error: e.message }, { status: Number(e.code) })
    else if (e instanceof Error)
      return NextResponse.json({ error: e.message }, { status: 500 })
    else return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
  }
}
