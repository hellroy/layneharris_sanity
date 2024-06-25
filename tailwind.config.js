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
        layneBlue: '#4cc9f0',
        layneMedBlue: '#4361ee',
        layneDarkBlue: '#3a0ca3',
        laynePurple: '#7209b7',
        laynePink: '#f72585',
        layneYellow: '#ffff3f', 
        customBlack: '#000000',
        customWhite: '#ffffff',
        customGray: '#ced2d9',
        customBlue: '#3b82f6',
        customRed: '#ef4444',
        customGreen: '#10b981',
        customYellow: '#f59e0b',
      },
      fontFamily: {
        silkscreen: ['Silkscreen', 'sans-serif'],
        headings: ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
