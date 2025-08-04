/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['your-domain.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  },
  // Optimize bundle
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable compression
  compress: true,
  // Optimize fonts
  optimizeFonts: true,
  // Enable SWC minification
  swcMinify: true,
}

module.exports = nextConfig