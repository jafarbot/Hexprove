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
          DEFAULT: "#00d4aa",
          50: "#e6fff9",
          100: "#b3ffed",
          200: "#80ffe0",
          300: "#4dffd4",
          400: "#1affc7",
          500: "#00d4aa",
          600: "#00a88a",
          700: "#007d66",
          800: "#005244",
          900: "#002922",
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
