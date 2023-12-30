module.exports = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dkniaw28r/image/upload/v1703276286/',
      },
    ],
  },
}