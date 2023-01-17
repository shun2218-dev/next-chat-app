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
    staticPageGenerationTimeout: 2000,
  },
  (text) => (text.includes("Duplicate atom key") ? "" : text)
);

module.exports = nextConfig;
