import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://static.tvmaze.com/**")],
  },
};

export default nextConfig;
