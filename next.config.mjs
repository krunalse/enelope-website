import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

// Sub-path the site is served from (https://enelope.ch/nexaai/). Set to "" to deploy at a domain root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/nexaai";

/** @type {(phase: string) => import('next').NextConfig} */
export default function nextConfig(phase) {
  return {
    output: "export",
    basePath,
    // Emit about/index.html instead of about.html so plain static hosts (LiteSpeed/Apache) serve /about/.
    trailingSlash: true,
    env: {
      NEXT_PUBLIC_BASE_PATH: basePath,
    },
    images: {
      // Static export ships pre-sized WebP from /public, so the optimizer is unused.
      unoptimized: true,
    },
    // Dev only (static export can't redirect): send http://localhost:3000/ to the base path.
    ...(phase === PHASE_DEVELOPMENT_SERVER &&
      basePath && {
        async redirects() {
          return [
            {
              source: "/",
              destination: `${basePath}/`,
              basePath: false,
              permanent: false,
            },
          ];
        },
      }),
  };
}
