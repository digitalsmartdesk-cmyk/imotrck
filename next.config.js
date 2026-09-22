/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/imotrck',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
