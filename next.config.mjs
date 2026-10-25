/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const isVercel = Boolean(process.env.VERCEL || process.env.VERCEL_URL);

// Base path configuration: GitHub Pages uses "/portfolio", Vercel uses root ""
const defaultBasePath = isVercel ? "" : "/portfolio";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : (isProd ? defaultBasePath : "");

const nextConfig = {
  // Disable static export on Vercel to allow full dynamic routes / API routes, or use export if on GH Pages
  ...(isVercel ? {} : { output: "export" }),
  
  // Image optimization disabled for static export
  images: {
    unoptimized: true,
  },
  
  // Base path configuration
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
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




