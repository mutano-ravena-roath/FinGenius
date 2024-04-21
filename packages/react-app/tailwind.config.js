/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /** primary */
        "primary": "#EE4444",
        "secondary": "#1A1A1B",
        /** base */
        "neutral": "#F0F1F6",
        "white": "#ffffff",
        /** functional */
        "success": "#329F3B",
        "error": "#E70532",
        "disabled": "#9B9B9B",
      },
      fontFamily: {
        'sans': ['Gilroy', 'sans-serif'],
        'serif': ['Gilroy', 'serif'],
        'mono': ['Gilroy', 'monospace'],
      },
    },
  },
  plugins: [],
}
