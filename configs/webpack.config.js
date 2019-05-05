const path = require('path')
const paths = require('./paths')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  mode: "development",
  context: paths.context,
  entry: {
    'app': paths.app
  },
  output: {
    // path: __dirname,
    path: paths.dist,
    publicPath: '/',
    filename: 'app.js'
    // library: 'Dnd',
    // libraryTarget: 'umd',
    // filename:  'dnd.js'
    //umdNamedDefine: true
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        options: {
          "presets": [
            ["@babel/preset-env", {
              "targets": {
                "browsers": "last 2 Chrome versions",
                "node": "current"
              },
            }]
          ],
          "plugins": [
            ["@babel/plugin-transform-runtime", {
              useESModules: true
            }]
            // ["babel-plugin-root-import", {
            //   "rootPathSuffix": "."
            // }]
          ]
        }
      }
    ]
  },
  resolve: {
    modules: [
      "node_modules"
    ],
    extensions: [".js", ".json", ".css"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['app'],
      template: paths.indexHtml,
      filename: 'index.html'
    })
  ],
  devtool: "source-map",
  // target: "web",
  stats: {
    // Nice colored output
    colors: true
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  devServer: {
    contentBase: paths.dist,
    compress: true,
    port: 9000,
    hot: true,
    https: false,
    noInfo: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}

module.exports.default = config;