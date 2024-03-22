/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};