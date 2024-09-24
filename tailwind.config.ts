import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      keyframes: {
        colorFlow: {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
      },
      animation: {
        colorFlow: 'colorFlow 5s infinite ease-in-out',
      },
      dropShadow: {
        glow: '0 0 20px rgba(138, 43, 226, 0.8)', // purple glow around text
      },
      boxShadow: {
        'gradient-glow': '0 0 15px 5px rgba(128, 90, 213, 0.6)', // subtle gradient shadow on buttons
      },
    },
  },
  plugins: [],
} satisfies Config;
