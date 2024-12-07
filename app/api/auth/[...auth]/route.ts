import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Discord, generateState, OAuth2RequestError } from 'arctic'

import { env } from '@/env'
import { getBaseUrl } from '@/lib/utils'
import { lucia } from '@/server/auth/lucia'
import { db } from '@/server/db'

// export const runtime = 'edge'

export const GET = async (req: NextRequest, { params }: { params: { auth: [string, string] } }) => {
  const [provider, isCallback] = params.auth

  let oauthProvider = null
  if (provider === 'discord')
    oauthProvider = new Discord(
      env.DISCORD_CLIENT_ID,
      env.DISCORD_CLIENT_SECRET,
      `${getBaseUrl()}/api/auth/${provider}/callback`,
    )
  if (!oauthProvider) return NextResponse.json({ message: 'Provider is invalid' }, { status: 500 })

  if (!isCallback) {
    const state = generateState()
    const scopes = ['email', 'identify']
    const url = oauthProvider.createAuthorizationURL(state, scopes)
    ;(await cookies()).set('oauth_state', state, {
      path: '/',
      secure: env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: 'lax',
    })
    return NextResponse.redirect(new URL(url, req.url))
  }

  try {
    const url = new URL(req.url)
    const code = url.searchParams.get('code') ?? ''
    const state = url.searchParams.get('state') ?? ''
    const storedState = req.cookies.get('oauth_state')?.value ?? ''
    ;(await cookies()).delete('oauth_state')
    if (!code || !state || state !== storedState) throw new Error('Invalid state')

    const tokens = await oauthProvider.validateAuthorizationCode(code)
    const accessToken = tokens.accessToken()

    const res = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json() as Promise<DiscordUser>)
      .then((user) => ({
        discordId: user.id,
        email: user.email,
        username: user.username,
        name: user.global_name,
        avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
      }))
      .catch(() => {
        throw new Error('Failed to fetch user data from Discord')
      })

    let user = await db.user.findFirst({
      where: { OR: [{ discordId: res.discordId }, { email: res.email }] },
    })
    if (!user) user = await db.user.create({ data: res })
    else user = await db.user.update({ where: { email: user.email }, data: res })

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    ;(await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return NextResponse.redirect(new URL('/', req.url))
  } catch (e) {
    if (e instanceof OAuth2RequestError)
      return NextResponse.json({ error: e.message }, { status: Number(e.code) })
    else if (e instanceof Error) return NextResponse.json({ error: e.message }, { status: 500 })
    else return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
  }
}

interface DiscordUser {
  id: string
  email: string
  username: string
  global_name: string
  avatar: string
}
