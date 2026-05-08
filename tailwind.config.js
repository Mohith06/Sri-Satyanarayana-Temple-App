/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        saffron: "#E8833A",
        gold: "#D4AF37",
        "warm-white": "#FDFAF6",
        "deep-red": "#8B1A1A",
        "temple-border": "#E8E0D5",
        "temple-card": "#FFFFFF",
        "temple-text": "#1A1A1A",
        "temple-muted": "#6B6B6B",
      },
    },
  },
  plugins: [],
};
