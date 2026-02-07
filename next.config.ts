import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["typeorm"],
  turbopack: {
    resolveAlias: {
      "reflect-metadata": "reflect-metadata",
    },
  },
};

export default nextConfig;
