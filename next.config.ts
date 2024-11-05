// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['openweathermap.org'],  // Permet de charger des images depuis ce domaine
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        port: '',
        pathname: '/img/wn/**',  // Chemin d'accès pour les icônes météo
      },
    ],
  },
};

export default nextConfig;
