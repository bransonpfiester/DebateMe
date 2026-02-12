import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f0ece4",
        dark: "#0a0a0a",
        "accent-blue": "#2a5cff",
        "accent-red": "#e03e36",
        muted: "#8a8578",
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        card: "24px",
      },
      boxShadow: {
        card: "0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.02), 0 24px 80px rgba(0,0,0,0.05)",
        "card-hover":
          "0 0 0 1px rgba(0,0,0,0.03), 0 4px 8px rgba(0,0,0,0.03), 0 32px 96px rgba(0,0,0,0.08)",
      },
      letterSpacing: {
        tightest: "-2px",
        label: "2px",
        "label-wide": "2.5px",
      },
      lineHeight: {
        hero: "0.92",
        tight: "1.05",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "bubble-in": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-bar": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.6s ease forwards",
        "slide-left":
          "slide-left 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "bubble-in":
          "bubble-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-bar":
          "scale-bar 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
