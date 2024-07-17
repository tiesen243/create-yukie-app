import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

import { siteConfig } from '@/lib/site'

interface Props {
  params: {
    title?: string
    desc?: string
  }
}

export const runtime = 'edge'

export const GET = async (_: NextRequest, { params }: Props): Promise<ImageResponse> => {
  const title = params.title ?? siteConfig.meta.applicationName ?? ''
  const description = params.desc ?? siteConfig.meta.description

  return new ImageResponse(
    (
      <div tw="w-full h-full px-20 py-28 flex flex-col items-center justify-center bg-black text-white">
        <h2 tw="text-4xl capitalize">{title}</h2>
        <p tw="text-2xl mt-2">{description}</p>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
