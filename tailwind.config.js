/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        cream: {
          50: '#FBF6E9',
          100: '#F8F0D8',
          200: '#F5E6C8',
          300: '#EED9A8',
          400: '#E5C885',
          500: '#D9B562',
        },
        forest: {
          50: '#E8EDEB',
          100: '#C9D3CF',
          200: '#8FA69F',
          300: '#5A7A72',
          400: '#3E6058',
          500: '#2F4F4F',
          600: '#264040',
          700: '#1E3232',
          800: '#162424',
          900: '#0E1616',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', 'Georgia', 'serif'],
        sans: ['"Noto Sans SC"', '"Source Han Sans SC"', '"PingFang SC"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
