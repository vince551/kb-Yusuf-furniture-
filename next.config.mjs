/** @type {import('next').NextConfig} */
const isVercel = process.env.VERCEL === '1';

const nextConfig = {
  // GitHub Pages serves this repository from /kb-Yusuf-furniture-.
  // Vercel uses normal Next.js routing and does not need a basePath.
  ...(isVercel
    ? {}
    : {
        output: 'export',
        basePath: '/kb-Yusuf-furniture-',
        assetPrefix: '/kb-Yusuf-furniture-/',
      }),
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
