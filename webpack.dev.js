const path = require("path");
const { merge } = require("webpack-merge");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/main.js",
    mode: "development",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        watchFiles: {
            paths: ['src/*.js', 'src/*.css', 'src/*.html'],
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            }
        ],
    },
    plugins: [new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/template.html"
        })]
};