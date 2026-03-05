import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          DEFAULT: "#00F5A0",
          50: "#e6fff5",
          100: "#b3ffdf",
          200: "#80ffc9",
          300: "#4dffb3",
          400: "#1aff9d",
          500: "#00F5A0",
          600: "#00C47A",
          700: "#00935b",
          800: "#00623d",
          900: "#00311e",
        },
        surface: {
          DEFAULT: "var(--surface)",
          50: "var(--surface-50)",
          100: "var(--surface-100)",
          200: "var(--surface-200)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient": "var(--hero-gradient)",
      },
    },
  },
  plugins: [],
};

export default config;
