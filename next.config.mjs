/** @type {import('next').NextConfig} */
const isVercel = process.env.VERCEL === '1';

const nextConfig = {
  // GitHub Pages needs a static export. Vercel should use normal Next.js output.
  ...(isVercel
    ? {}
    : {
        output: 'export',
        basePath: '/tovi',
        assetPrefix: '/tovi/',
      }),
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
