import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["typeorm", "reflect-metadata"],
  // Usar turbopack pero com minificação desabilitada para preservar nomes de classes
  turbopack: {
    resolveAlias: {
      "reflect-metadata": "reflect-metadata",
    },
  },
};

export default nextConfig;
