import type { NextConfig } from 'next'

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import '@/env'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
}

export default nextConfig
