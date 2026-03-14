import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/**": ["./data/**/*.json"],
  },
  staticPageGenerationTimeout: 120,
};

export default nextConfig;
