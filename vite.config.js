import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// `npm run build`         → normal production build in dist/
// `npm run build:single`  → one self-contained HTML file in dist-single/ (easy to preview / share)
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === "single" ? [viteSingleFile()] : [])],
  build: mode === "single" ? { outDir: "dist-single", assetsInlineLimit: 100000000 } : {},
}));
