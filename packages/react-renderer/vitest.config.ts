import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
    deps: {
      interopDefault: true,
    },
  },
  resolve: {
    alias: {
      "@ruiapp/move-style": path.resolve(__dirname, "../move-style/src/mod.ts"),
      "@ruiapp/log": path.resolve(__dirname, "../log/src/mod.ts"),
      "~": path.resolve(__dirname, "../move-style/src"),
    },
  },
  optimizeDeps: {
    include: ["lodash"],
  },
});
