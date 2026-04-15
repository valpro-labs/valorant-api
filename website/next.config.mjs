import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

// For GitHub Pages deployment at https://<user>.github.io/<repo>/
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default withMDX(config);
