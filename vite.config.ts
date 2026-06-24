import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { APP_BASE_PATH } from './appBase';

// https://vite.dev/config/
export default defineConfig({
  base: APP_BASE_PATH,
  plugins: [react()],
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "src/api"),
      "@app-types": path.resolve(__dirname, "src/app-types"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@config": path.resolve(__dirname, "src/config"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@store": path.resolve(__dirname, "src/store"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@schemas": path.resolve(__dirname, "src/schemas"),
    },
  },
});
