/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Default is 1mb, which rejects most real-world photo uploads before
      // they reach the service-image / avatar Server Actions.
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
