import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F9FB",
        ink: {
          DEFAULT: "#0A2540",
          soft: "#3A5570",
        },
        brand: {
          DEFAULT: "#0F4C81",
          dark: "#0A2540",
          light: "#3B7BB8",
        },
        signal: {
          DEFAULT: "#3BA7DB",
          bright: "#7FD4F5",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#EEF3F7",
          dark: "#0A1628",
          "dark-muted": "#101F35",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "signal-glow":
          "radial-gradient(circle at center, rgba(59,167,219,0.35) 0%, rgba(59,167,219,0) 70%)",
      },
      keyframes: {
        "pulse-node": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-node": "pulse-node 2.4s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
