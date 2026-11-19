// Prefixo dos arquivos de public/ quando o site roda numa subpasta (GitHub Pages: /ecoos-landing).
// Vem do build (NEXT_PUBLIC_BASE_PATH, mesmo valor do basePath no next.config.ts); local fica vazio.
export const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
