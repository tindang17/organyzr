const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // context: path(__dirname, 'src'),

  entry: [
    // 'webpack-dev-server/client?http://localhost:8080',
    'webpack-hot-middleware/client',
    './client/src/index.jsx'
    // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: path.resolve(__dirname, 'dist' ),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'src' )],
        loader: 'babel-loader',
        exclude: /node_modules/, 
        options: {presets: ['es2015', 'react']}
      },
      {
        test: [/\.css$/],
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: 'url-loader'
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: './client/index.html'
    })],
}