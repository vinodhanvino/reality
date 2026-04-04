/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: "/contact", destination: "/book-demo", permanent: true }];
  },
};

module.exports = nextConfig;
