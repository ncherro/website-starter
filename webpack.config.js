var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'js', 'entry.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'css?sourceMap!' +
          'sass?sourceMap'
        )
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.jpe?g$|\.png$|\.gif$|\.wav$|\.mp3$/,
        loader: 'file'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: false,
      template: 'src/index.html',
      inject: 'body',
      favicon: 'src/images/favicon.png',
      title: 'It works!',
      description: 'Yesssssss'
    }),
    new ExtractTextPlugin('css/styles.css')
  ]
}

