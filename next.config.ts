import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  webpack(config) {
    const fileLoaderRules = config.module.rules
      .flatMap((rule: any) => (rule.oneOf ? rule.oneOf : rule))
      .filter((rule: any) => rule?.test instanceof RegExp && rule.test.test(".png"));

    for (const rule of fileLoaderRules) {
      if (rule.type === "asset") {
        rule.type = "asset/resource";
      }
    }

    return config;
  },
};

export default nextConfig;
