import type { NextConfig } from "next";

// GH_PAGES=1 builds a static demo for GitHub Pages (no API routes there).
const ghPages = process.env.GH_PAGES === "1";

const nextConfig: NextConfig = ghPages
  ? {
      output: "export",
      basePath: "/kepter-wear",
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      async redirects() {
        return [
          {
            source: "/",
            destination: "/ru",
            permanent: false,
          },
        ];
      },
    };

export default nextConfig;
