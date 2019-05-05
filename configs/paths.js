import path from 'path'
const absolutePath = _path => path.join(__dirname, '..', _path)

export default {
  context: absolutePath('src'),
}
