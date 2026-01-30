// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Already there (Good)
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // Already there (Good)
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',        // 🟢 NEW: Needed for your new banner
      },
    ],
  },
}

module.exports = nextConfig