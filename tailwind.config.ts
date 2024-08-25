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
        sans: ["Nunito", "sans-serif"],
        lilita: ["Lilita One", "sans-serif"],
      },
      fontSize: {
        base: "12px",
      },
      colors: {
        primary: "#03AED2",
        "primary-dark": "#46B2A2",
        "primary-darkest": "#4B70F5",
        secondary: "#F5CE02",
        text: "#1E201E",
        gray: "#A4A4A4",
        red: "#FF4C4C",
      },
      textColor: {
        DEFAULT: "#1E201E",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
