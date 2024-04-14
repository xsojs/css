const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'css',
      fileName: (format) => `xso-css.${format}.js`
    }
  }
});