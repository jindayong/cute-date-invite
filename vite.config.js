import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectRoot = process.cwd().replace(/\\/g, "/");

export default defineConfig({
  root: projectRoot,
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html"
      }
    }
  }
});
