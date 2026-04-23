import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    cpus: 1,
  },
  outputFileTracingIncludes: {
    "/**": ["./data/**/*.json"],
  },
  staticPageGenerationTimeout: 120,
};

export default nextConfig;
