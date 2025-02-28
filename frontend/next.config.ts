import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "i.scdn.co", // Spotify album art
      "localhost", // Development images
      "domain.com", // Production domain
      "assets.example.com", // Other image hosts
    ],
  },
};

export default nextConfig;
