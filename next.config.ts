import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/uploads/:file",
          destination: "/api/media/:file",
        },
      ],
    };
  },
};

export default nextConfig;
