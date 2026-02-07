import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["typeorm", "reflect-metadata"],
  
  // Configuração vazia para Turbopack (silenciar warning)
  turbopack: {},
  
  // Configurar webpack para preservar nomes de classes em produção
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Preservar nomes de classes para TypeORM
      if (config.optimization?.minimizer) {
        config.optimization.minimizer.forEach((minimizer: any) => {
          if (minimizer.constructor.name === 'TerserPlugin') {
            minimizer.options = {
              ...minimizer.options,
              terserOptions: {
                ...minimizer.options?.terserOptions,
                keep_classnames: true,
                keep_fnames: true,
              },
            };
          }
        });
      }
    }
    return config;
  },
};

export default nextConfig;
