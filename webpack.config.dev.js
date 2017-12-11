const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    index: './src/base'
  },
  output: {
    filename: '[name].js',
    publicPath: "/",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: './src',
  },
  devtool: 'eval',
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
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'src/plugin')],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'News API',
      hash: true,
      template: './src/index.html'
    }),
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('[name].css');
      },
      allChunks: false,
    }),
  ]
};