/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/", // Redirects to the root domain
        permanent: true, // Uses a 308 Permanent Redirect
      },
    ];
  },

  compress: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
