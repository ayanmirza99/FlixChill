/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'www.themoviedb.org',
      },
      {
        hostname: 'image.tmdb.org',
      },
    ],
  },
};

module.exports = nextConfig;
