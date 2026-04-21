import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        btc: "var(--btc)",
        "btc-dim": "var(--btc-dim)",
        bg: "var(--bg)",
        "bg-2": "var(--bg-2)",
        "bg-3": "var(--bg-3)",
        border: "var(--border)",
        "border-active": "var(--border-active)",
        text: "var(--text)",
        "text-2": "var(--text-2)",
        "text-3": "var(--text-3)",
        green: "var(--green)",
        "green-dim": "var(--green-dim)",
        red: "var(--red)"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"]
      },
      boxShadow: {
        glow: "0 0 0 1px var(--btc-glow), 0 0 24px var(--btc-glow)"
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px"
      },
      letterSpacing: {
        label: "0.08em"
      }
    }
  },
  plugins: []
};

export default config;
