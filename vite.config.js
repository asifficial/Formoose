import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  test: {
    testFiles: ["**/*.test.js"],
    environment: "happy-dom",
  },
  build: {
    lib: {
      entry: resolve(__dirname, "lib/formoose.js"),
      name: "Formoose",
      fileName: (format) => `formoose.${format}.js`,
    },
    // outDir: "dist",
    rollupOptions: {
      output: {
        format: "umd",
      },
    },
    emptyOutDir: true,
  },
  server: {
    open: "./demo/index.html",
  },
});
