/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true, // ✅ Gzip compression
  swcMinify: true, // ✅ Minify JS using SWC
  reactStrictMode: true, // ✅ Helps catch React issues during development
  productionBrowserSourceMaps: false, // ✅ Prevents exposing source maps in production
  experimental: {
    optimizeCss: true, // ✅ Optimize CSS output
    scrollRestoration: true, // ✅ Better scroll behavior
  },
  images: {
    formats: ["image/avif", "image/webp"], // ✅ Serve optimized images
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // ✅ Remove console.logs in production
  },
};

export default nextConfig;
