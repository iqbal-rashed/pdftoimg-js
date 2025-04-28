import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["dist/**/*", "example/**/*"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["dist/**/*", "example/**/*"],
    plugins: {
      js,
    },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["dist/**/*", "example/**/*"],
    extends: [tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);
