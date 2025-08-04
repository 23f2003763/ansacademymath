/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  },
  experimental: {
    // Remove 'appDir' - it's deprecated in Next.js 14
    serverComponentsExternalPackages: ['@prisma/client']
  },
  images: {
    domains: ['localhost', 'railway.app', 'up.railway.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.up.railway.app',
      },
    ],
  }
}

module.exports = nextConfig