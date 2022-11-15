/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  env: {
    ACCESS_TOKEN_SECRET:
      "48f234b26ecdd84220f1a8a85d13496874041d6b1eab09c4506ae152c2bebd0a",
    REFRESH_TOKEN_SECRET:
      "fabff2fa3833326be2e4170e1ad3e5c1d4639752197bc5175dfb75c51f737dbb",
  },
};

module.exports = nextConfig;
