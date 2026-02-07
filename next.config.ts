import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["typeorm", "reflect-metadata"],
};

export default nextConfig;
