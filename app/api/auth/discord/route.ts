import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { generateState } from 'arctic'

import { env } from '@/env'
import { discord } from '@/server/auth/lucia'

export const GET = async (req: NextRequest) => {
  const state = generateState()
  const url = await discord.createAuthorizationURL(state, {
    scopes: ['identify', 'email'],
  })

  cookies().set('discord_oauth_state', state, {
    path: '/',
    secure: env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  })

  return NextResponse.redirect(new URL(url, req.url))
}
