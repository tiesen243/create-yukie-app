import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { OAuth2RequestError } from 'arctic'

import { discord, lucia } from '@/server/auth/lucia'
import { db } from '@/server/db'

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const storedState = req.cookies.get('discord_oauth_state')?.value ?? null
  if (!code || !state || state !== storedState)
    return NextResponse.json({ message: 'Invalid state' }, { status: 400 })

  cookies().delete('discord_oauth_state')

  try {
    const tokens = await discord.validateAuthorizationCode(code)
    const discordUserRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokens.accessToken}` },
    })
    const discordUser = (await discordUserRes.json()) as DiscordUser
    const discord_ = {
      username: discordUser.username,
      name: discordUser.global_name,
      email: discordUser.email,
      avatar: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`,
    }

    // check if user exists in database
    const existedUser = await db.user.findFirst({
      where: {
        OR: [{ discordId: discordUser.id }, { email: discordUser.email }],
      },
    })
    if (existedUser) {
      await db.user.update({ where: { id: existedUser.id }, data: discord_ })

      const session = await lucia.createSession(existedUser.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

      return NextResponse.redirect(new URL('/', req.url))
    }

    const newUser = await db.user.create({
      data: { ...discord_, discordId: discordUser.id },
    })

    const session = await lucia.createSession(newUser.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return NextResponse.redirect(new URL('/', req.url))
  } catch (e) {
    if (e instanceof OAuth2RequestError)
      return NextResponse.json({ message: e.message, description: e.description }, { status: 400 })
    if (e instanceof Error) return NextResponse.json({ message: e.message }, { status: 500 })
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
  }
}

interface DiscordUser {
  id: string
  email: string
  username: string
  global_name: string
  avatar: string
}
