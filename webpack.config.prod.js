const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/base'
  },
  output: {
    filename: '[name].js',
    publicPath: "./",
    path: path.resolve(__dirname, "build")
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.png$/,
        loader: "file-loader",
        options: {
          name: '[path][name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: 'News API',
      hash: true,
      template: './src/index.html'
    }),
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('style/[name].css');
      },
      allChunks: false,
    }),
  ]
};