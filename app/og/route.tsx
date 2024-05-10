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
  const dotBg = {
    backgroundImage:
      'radial-gradient(circle at 25px 25px, #CCC 2%, transparent 0%), radial-gradient(circle at 75px 75px, #CCC 2%, transparent 0%)',
    backgroundSize: '100px 100px',
  }

  const title = params.title ?? siteConfig.metadata.title.default
  const description = params.desc ?? siteConfig.metadata.description

  return new ImageResponse(
    (
      <div
        tw="flex flex-col gap-4 w-full h-full items-center text-black p-20 justify-center bg-white"
        style={dotBg}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={title}
          src="https://avatars.githubusercontent.com/u/101703006?v=4"
          tw="rounded-lg shadow-lg w-1/4 aspect-square"
        />

        <div tw="flex flex-col justify-center items-center w-3/4 pr-4">
          <h2 tw="text-4xl capitalize">{title}</h2>
          <p tw="text-2xl mt-4">{description}</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
