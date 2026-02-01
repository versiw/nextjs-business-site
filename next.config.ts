import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**'
      }
    ]
  },
  distDir: 'dist',
  output: 'export'
}

export default nextConfig
