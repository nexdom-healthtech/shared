import path from "path";
import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  run: {
    tasks: {
      docs: {
        command: "vpr docs:dev",
        dependsOn: ["build"],
        cache: false,
      },
      "docs:build": {
        command: "vpx vitepress build docs",
        dependsOn: ["build"],
      },
    },
  },
  pack: {
    entry: {
      index: "src/index.ts",
      models: "src/models/index.ts",
      services: "src/services/index.ts",
      utils: "src/utils/index.ts",
    },
    dts: {
      tsgo: true,
    },
    exports: true,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@mocks": path.resolve(__dirname, "./mocks"),
    },
  },
  test: {
    globals: true,
    clearMocks: true,
    environment: "jsdom",
    coverage: { reporter: ["text"] },
    setupFiles: ["src/__tests__/setup.ts"],
  },
});
