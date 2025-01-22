import { Discord, generateState } from 'arctic'

import { env } from '@/env'
import { db } from '../db'

export class OAuth {
  private name: string
  private provider: Discord
  private scopes: string[]
  private oauthUser: { id: string; email: string; name: string; image: string }

  constructor(provider: string, callback_url: string) {
    this.oauthUser = { id: '', email: '', name: '', image: '' }

    switch (provider) {
      case 'discord':
        this.name = 'discord'
        this.provider = new Discord(env.DISCORD_ID, env.DISCORD_SECRET, callback_url)
        this.scopes = ['identify', 'email']
        break
      default:
        throw new Error(`Provider ${provider} not supported`)
    }
  }

  public getOAuthUrl(): { url: URL; state: string } {
    const state = generateState()

    const url =
      this.provider.createAuthorizationURL.length === 3
        ? this.provider.createAuthorizationURL(state, null, this.scopes)
        : // @ts-expect-error - This is a hack to make the types work
          this.provider.createAuthorizationURL(state, this.scopes)

    return { url, state }
  }

  public async callback(code: string) {
    const tokens =
      this.provider.validateAuthorizationCode.length == 2
        ? await this.provider.validateAuthorizationCode(code, '')
        : // @ts-expect-error - This is a hack to make the types work
          await this.provider.validateAuthorizationCode(code)

    switch (this.name) {
      case 'discord':
        await this.discord(tokens.accessToken())
        break
      default:
        throw new Error(`Provider ${this.name} not supported`)
    }

    return await this.createUser()
  }

  private async createUser() {
    const { id, email, name, image } = this.oauthUser
    const create = { provider: this.name, providerId: id, providerName: name }

    const account = await db.account.findUnique({
      where: { provider_providerId: { provider: this.name, providerId: id } },
    })
    let user = await db.user.findFirst({ where: { email } })

    if (!account && !user)
      user = await db.user.create({
        data: { email, name, image, accounts: { create } },
      })
    else if (!account && user)
      user = await db.user.update({
        where: { email },
        data: { accounts: { create } },
      })

    if (!user) throw new Error(`Failed to sign in with ${this.name}`)
    return user
  }

  private async discord(token: string) {
    // prettier-ignore
    interface DiscordUser { id: string; email: string; username: string; avatar: string }
    this.oauthUser = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json() as Promise<DiscordUser>)
      .then((account) => ({
        id: account.id,
        name: account.username,
        email: account.email,
        image: `https://cdn.discordapp.com/avatars/${account.id}/${account.avatar}.png`,
      }))
      .catch(() => {
        throw new Error('Failed to fetch user data from Discord')
      })
  }
}
