import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@agentforce/ui",
    "@agentforce/ai-engine",
    "@agentforce/checklist-engine",
    "@agentforce/prompt-library",
    "@agentforce/analytics"
  ],
  experimental: {
    typedRoutes: true
  }
};

export default nextConfig;
