import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfeff",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490"
        }
      },
      boxShadow: {
        soft: "0 18px 60px -32px rgba(15, 23, 42, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
