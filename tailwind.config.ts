import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F9FB",
        ink: {
          DEFAULT: "#0A2540",
          soft: "#3A5570",
          faint: "#55708A",
        },
        brand: {
          DEFAULT: "#0F4C81",
          dark: "#08203A",
          light: "#3B7BB8",
        },
        signal: {
          DEFAULT: "#3BA7DB",
          bright: "#7FD4F5",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#EEF3F7",
        },
        footer: {
          DEFAULT: "#071B2F",
          soft: "#102C46",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
      backgroundImage: {
        "signal-glow":
          "radial-gradient(circle at center, rgba(59,167,219,0.35) 0%, rgba(59,167,219,0) 70%)",
        "hero-wash":
          "radial-gradient(120% 100% at 15% 0%, rgba(59,167,219,0.18) 0%, rgba(59,167,219,0) 55%), radial-gradient(90% 80% at 95% 15%, rgba(15,76,129,0.14) 0%, rgba(15,76,129,0) 60%)",
        "grid-fade":
          "linear-gradient(to right, rgba(10,37,64,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,37,64,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "64px 64px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10,37,64,0.04), 0 8px 24px -12px rgba(10,37,64,0.12)",
        lift: "0 2px 4px rgba(10,37,64,0.05), 0 24px 48px -20px rgba(10,37,64,0.22)",
        frame: "0 24px 64px -32px rgba(10,37,64,0.45)",
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
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.06)" },
        },
      },
      animation: {
        "pulse-node": "pulse-node 2.4s ease-in-out infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.8s ease-out both",
        "ken-burns": "ken-burns 9s ease-out both",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
