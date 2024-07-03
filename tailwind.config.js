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
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        'hard': '8px 8px #f72585',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)',
        ]
      },
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
        layneGrad: 'linear-gradient(to right, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))',

      },
      fontFamily: {
        silkscreen: ['Silkscreen', 'sans-serif'],
        headings: ['Bebas Neue', 'sans-serif'],
        cheeVariable: ['cheee-variable', 'sans-serif'],
        synthemesc: ["synthemesc", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
