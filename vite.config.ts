// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./__tests__/unitTests/vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@constants": "/src/constants",
      "@types": "/src/types",
      "@utils": "/src/utils",
      "@components": "/src/components",
      "@hooks": "/src/hooks",
      "@models": "/src/models",
      "@services": "/src/services",
      "@config": "/src/config",
      "@store": "/src/store",
      "@providers": "/src/providers",
      "@views": "/src/components/views",
      "@styles": "/src/styles",
    },
  },
});
