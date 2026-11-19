import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site estático: `npm run build` gera a pasta out/, que sobe em qualquer hospedagem.
  output: "export",
  // GitHub Pages serve em /ecoos-landing: o workflow define NEXT_PUBLIC_BASE_PATH (ver app/base.ts). Local fica na raiz.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
