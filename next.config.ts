import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["typeorm", "reflect-metadata"],
  
  // Configuração vazia para Turbopack (silenciar warning)
  turbopack: {},
  
  // Configurar webpack para preservar nomes de classes em produção
  webpack: (config, { isServer }) => {
    if (isServer) {
      // DESABILITAR COMPLETAMENTE minificação no server-side
      // para preservar nomes de classes TypeORM
      config.optimization = {
        ...config.optimization,
        minimize: false,
      };
    }
    return config;
  },
};

export default nextConfig;
