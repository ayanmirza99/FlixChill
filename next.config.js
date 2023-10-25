/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: "www.themoviedb.org"
      },
      {
        hostname:"image.tmdb.org"
      }
    ],
  },
  nextConfig,
};
