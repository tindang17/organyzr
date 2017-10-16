const path = require('path');
const webpack = require('webpack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';

const config = {
  // context: path(__dirname, 'src'),

  entry: [
    'webpack-hot-middleware/client',
    './client/src/index.jsx'
    // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: path.resolve(__dirname, 'dist' )

  },

  devtool: ENV === 'production' ? 'cheap-source-map' : 'inline-source-map',

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
    new BundleAnalyzerPlugin({
      analyzerHost: '0.0.0.0',
      analyzerPort: 3000
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: './client/index.html'

    })]
}

if(process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  }))
}

module.exports = config;

