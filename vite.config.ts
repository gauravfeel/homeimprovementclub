import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    watch: {
      ignored: ["**/artifacts/**"],
    },
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8787",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
  optimizeDeps: {
    entries: ["index.html"],
    include: [
      "@sanity/client",
      "@sanity/image-url",
      "@portabletext/react",
      "sanity",
      "@sanity/vision",
      "styled-components",
      "react-is",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/sanity") || id.includes("node_modules\\sanity")) {
            return "sanity-studio";
          }
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("react-dom") || id.includes("/react/") || id.includes("\\react\\")) {
            return "react-vendor";
          }
          if (id.includes("react-router")) return "router";
          if (id.includes("@radix-ui")) return "radix-ui";
        },
      },
    },
  },
});
