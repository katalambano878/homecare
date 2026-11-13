import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "midaid.com" },
      { protocol: "https", hostname: "www.midaid.com" },
    ],
  },
};

export default nextConfig;
