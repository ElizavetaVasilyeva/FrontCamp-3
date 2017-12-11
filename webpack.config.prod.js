const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: {
        index: "./src/base"
    },
    output: {
        filename: "app.bundle.js",
        publicPath: "./",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            },
            {
                test: /\.png$/,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]?[hash]"
                }
            }
        ]
    },
    resolve: {
      alias: {
        'jquery-ui': 'jquery-ui-dist/jquery-ui.js'
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            // In case you imported plugins individually, you must also require them here:
            Util: "exports-loader?Util!bootstrap/js/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
        }),
        new HtmlWebpackPlugin({
            title: "News API",
            hash: true,
            template: "./index.html",
        }),
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath("style/[name].css")
            },
            allChunks: false,
        }),
    ]
};
