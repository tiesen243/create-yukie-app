import { ImageResponse } from 'next/og'

import { seo } from '@/lib/seo'

export const runtime = 'edge'

export const GET = async (
  _: Request,
  {
    params: { title = String(seo({}).title), description = String(seo({}).description) },
  }: { params: { title?: string; description?: string; hero?: string } },
) =>
  new ImageResponse(
    (
      <div
        tw="flex justify-between items-center w-full h-full p-20 bg-black"
        style={{
          backgroundImage: `linear-gradient(to top right, #AB1D1C, transparent), linear-gradient(to top, #303030 2px, transparent 2px), linear-gradient(to right, #303030 2px, transparent 2px)`,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        }}
      >
        <div tw="flex flex-col justify-center text-white">
          <h1 tw="max-w-[550px] text-6xl font-bold">{title}</h1>

          <p tw="max-w-[600px] mt-4 text-2xl">{description}</p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://tiesen.id.vn/images/logo.svg"
          alt="Logo"
          tw="w-2/5 ml-8"
          style={{ filter: 'invert(1)' }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
