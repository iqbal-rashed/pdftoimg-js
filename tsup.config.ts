import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    splitting: false,
    clean: true,
    minify: true,
    shims: true,
  },
  {
    entry: ["src/cli.ts"],
    format: ["cjs"],
    splitting: false,
    clean: true,
    minify: true,
    shims: true,
  },
  {
    entry: ["src/browser.ts"],
    format: ["cjs", "esm"],
    splitting: false,
    dts: true,
    clean: true,
    minify: true,
    shims: true,
  },
]);
