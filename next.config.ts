import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["typeorm"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), "better-sqlite3", "mysql2", "oracledb", "pg"];
    }
    return config;
  },
};

export default nextConfig;
