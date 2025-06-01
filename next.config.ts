import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dms.heal-wellness.co.uk",
      },
      {
        protocol: "https",
        hostname: "stanmorewellnessclinic.com",
      },
    ],
  },
};

export default nextConfig;
