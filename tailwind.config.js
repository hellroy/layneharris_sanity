/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        customBlack: '#000000',
        customWhite: '#ffffff',
        customGray: '#ced2d9',
        customBlue: '#3b82f6',
        customRed: '#ef4444',
        customGreen: '#10b981',
        customYellow: '#f59e0b',
      },
    },
  },
  plugins: [],
}
