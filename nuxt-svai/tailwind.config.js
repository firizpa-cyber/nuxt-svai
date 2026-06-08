/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: 'oklch(0.42 0.16 25)',
          foreground: 'oklch(0.98 0.01 80)',
        },
        gold: 'oklch(0.72 0.13 75)',
        birch: 'oklch(0.93 0.025 80)',
        soot: 'oklch(0.18 0.01 40)',
        forest: 'oklch(0.32 0.06 145)',
      },
      boxShadow: {
        elevated: '0 30px 60px -25px rgba(120,20,20,0.35)',
        card: '0 8px 24px -12px rgba(30,20,15,0.25)',
      },
    },
  },
  plugins: [],
}
