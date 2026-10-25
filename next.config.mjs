/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

// For GitHub Pages deployment under https://dhruvdev-codes.github.io/portfolio
const defaultBasePath = "/portfolio";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : (isProd ? defaultBasePath : "");

const nextConfig = {
  // Static export for GitHub Pages
  output: "export",
  
  // Image optimization disabled for static export
  images: {
    unoptimized: true,
  },
  
  // Base path configuration
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  
  // Production optimizations
  reactStrictMode: true,
  swcMinify: true,
  
  // Compiler options for better performance
  compiler: {
    removeConsole: isProd ? { exclude: ["error", "warn"] } : false,
  },
  
  // Vercel analytics and Web Vitals
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;



