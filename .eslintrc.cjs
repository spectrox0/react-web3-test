const path = require("path");
const synpressPath = path.join(
  process.cwd(),
  "/node_modules/@synthetixio/synpress"
);
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
    `${synpressPath}/.eslintrc.js`,
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "tailwindcss"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "warn",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  settings: {
    tailwindcss: {
      // The following settings allow it to read your config as well as telling it that taiwlind will be found in our custom helper function
      config: "tailwind.config.js",
    },
  },
};
