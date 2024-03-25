module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "tailwindcss"],
  rules: {
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
