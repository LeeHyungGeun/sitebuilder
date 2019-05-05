const path = require('path')
const absolutePath = _path => path.join(__dirname, '..', _path)

module.exports = {
  context: absolutePath('src'),
  app: absolutePath('src/app.js'),
  dist: absolutePath('dist'),
  public: absolutePath('src/public'),
  indexHtml: absolutePath('src/public/index.html'),
}
