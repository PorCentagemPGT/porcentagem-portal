import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT || '3000'
  },
  server: {
    port: parseInt(process.env.NEXT_PUBLIC_PORT || '3000', 10)
  }
};

export default nextConfig;
