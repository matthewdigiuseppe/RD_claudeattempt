const path = require('path')
const tailwindcss = require('@tailwindcss/postcss')
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    tailwindcss({
      base: path.resolve(__dirname),
      optimize: false,
    }),
    autoprefixer,
  ],
}
