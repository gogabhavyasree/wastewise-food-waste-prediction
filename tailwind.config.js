/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#065f46', // Emerald 800
        secondary: '#0f766e', // Teal 700
        background: '#f8fafc', // Slate 50
        card: '#ffffff',
        text: '#334155', // Slate 700
        accent: '#d1fae5', // Emerald 100
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif', 'system-ui'],
      }
    },
  },
  plugins: [],
}
