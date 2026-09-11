/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

// For GitHub Pages deployment under https://dhruvdev-codes.github.io/portfolio
const defaultBasePath = "/portfolio";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : (isProd ? defaultBasePath : "");

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
};

export default nextConfig;


