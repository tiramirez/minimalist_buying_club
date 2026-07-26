/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'brand-terracotta': '#D95F4B',
        'brand-rose': '#C4705E',
        'brand-rose-light': '#F2BEB3',
        'brand-cream': '#FAF8F5',
        'brand-off-white': '#FDFAF8',
        'brand-warm-gray': '#9B8D85',
        'brand-border': '#E8E2DC',
        'brand-text-primary': '#1A1514',
        'brand-sage': '#5A7A5C',
        'brand-error': '#B84A38',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['DM Serif Display', 'serif'],
      },
    },
  },
  plugins: [],
}