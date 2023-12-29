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

// https://res.cloudinary.com/dkniaw28r/image/upload/v1703276286/red_u2nmcv.jpg