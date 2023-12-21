/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ak-static.cms.nba.com",
      },
      {
        hostname: "cdn.nba.com",
      },
    ],
  },
};

module.exports = nextConfig;
