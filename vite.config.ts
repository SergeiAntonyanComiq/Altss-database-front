import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: "/", // Ensure base path is set
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["altss.a.pinggy.link", "*.pinggy.link"],
  },
  build: {
    outDir: "dist",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
