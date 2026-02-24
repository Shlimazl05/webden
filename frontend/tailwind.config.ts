import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Gán biến CSS vào font-family mặc định (sans)
        sans: ["var(--font-be-vietnam)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;