/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/tovi',
  assetPrefix: '/tovi/',
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
