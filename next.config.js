/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '25mb',
    },
    turbopackUseSystemTlsCerts: true,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
