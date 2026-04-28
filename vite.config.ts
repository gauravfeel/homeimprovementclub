import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("react-dom") || id.includes("/react/") || id.includes("\\react\\")) {
            return "react-vendor";
          }
          if (id.includes("react-router")) return "router";
          if (id.includes("@radix-ui")) return "radix-ui";
          if (id.includes("@formspree")) return "formspree";
        },
      },
    },
  },
});
