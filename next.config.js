/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '25mb',
    },
    turbopackUseSystemTlsCerts: true,
    optimizeCss: false,
  },
  reactStrictMode: true,
  serverExternalPackages: ['lightningcss', 'lightningcss-darwin-arm64'],
  webpack: config => {
    config.externals = config.externals || []
    config.externals.push({
      lightningcss: 'commonjs lightningcss',
      'lightningcss-darwin-arm64': 'commonjs lightningcss-darwin-arm64',
    })
    return config
  },
}

module.exports = nextConfig
