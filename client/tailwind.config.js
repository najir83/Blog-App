// tailwind.config.js
module.exports = {
  theme: {
    container: {
      center: true,         // center the container by default
      padding: '1rem',      // default padding (you can also use { DEFAULT: '1rem', sm: '2rem', ... })
      screens: {
        sm: '100%',         // full width on small screens
        md: '720px',
        lg: '100%',
        xl: '1140px',
        '2xl': '1320px',
      },
    },
  },
  plugins: [],
}
