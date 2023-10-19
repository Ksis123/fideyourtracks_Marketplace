module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#ff6d38",
        "secondary": "#ffffff",
        "active": "#ff8b0f",
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'red': '#ff8b0f',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
  
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
