/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ak-static.cms.nba.com",
      },
    ],
  },
};

module.exports = nextConfig;
