/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'newsapi.org',
      'via.placeholder.com'
    ],
    formats: ['image/avif', 'image/webp'],
  },
  i18n: {
    locales: ['hi', 'en'],
    defaultLocale: 'hi',
  },
}

module.exports = nextConfig