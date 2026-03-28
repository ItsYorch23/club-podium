import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#22C55E",
        "primary-dark": "#16A34A",
        background: "#0F172A",
        dark: "#020617",
        text: "#F8FAFC",
        muted: "#94A3B8",
      },
    },
  },
  plugins: [],
};

export default config;
