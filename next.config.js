/** @type {import('next').NextConfig} */

const withInterceptStdut = require("next-intercept-stdout");

const nextConfig = withInterceptStdut(
  {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ["firebasestorage.googleapis.com"],
    },
    experimental: {
      appDir: true,
    },
  },
  (text) => (text.includes("Duplicate atom key") ? "" : text)
);

module.exports = nextConfig;
