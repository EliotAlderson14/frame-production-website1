import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  optimizeDeps: { entries: ["index.html"] },
  resolve: { alias: { "@": path.resolve(process.cwd(), "src") } },
  esbuild: { jsx: "automatic" },
  build: { outDir: "../dist", emptyOutDir: true },
});
