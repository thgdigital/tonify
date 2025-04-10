import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  webpack: (config) => {
    
    config.externals = [...(config.externals || [] )];
    return config;
  },
};

export default nextConfig;
