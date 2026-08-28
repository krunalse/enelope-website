/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    // Static export ships pre-sized WebP from /public, so the optimizer is unused.
    unoptimized: true,
  },
};

export default nextConfig;
