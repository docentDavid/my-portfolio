import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["placehold.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
