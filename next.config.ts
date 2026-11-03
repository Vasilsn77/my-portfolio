import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/devicons/devicon@latest/**",
      },
    ],
  },
  turbopack: {
    // Pin the workspace root so Turbopack doesn't infer a lockfile from a parent dir.
    root: process.cwd(),
  },
};

export default nextConfig;
