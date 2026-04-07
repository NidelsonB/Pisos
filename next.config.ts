import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.GITHUB_PAGES === "true" ? "export" : "standalone",
  basePath: process.env.GITHUB_PAGES === "true" ? process.env.NEXT_PUBLIC_BASE_PATH : undefined,
  trailingSlash: process.env.GITHUB_PAGES === "true" ? true : undefined,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
