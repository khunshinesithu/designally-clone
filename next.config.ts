import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // `@sanity/workbench` (a transitive dep of the Studio) resolves its
  // `development` export condition to raw TypeScript inside node_modules, which
  // Turbopack refuses to compile — /studio fails to load in `next dev` with
  // "Unknown module type". Production is unaffected: the `default` condition
  // points at built JS. Listing it here opts the package into compilation.
  transpilePackages: ["@sanity/workbench"],
  images: {
    remotePatterns: [
      {
        // Images served from Sanity's CDN once content is migrated. Before that,
        // pages fall back to the local files under /public and never hit this.
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
