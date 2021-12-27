const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/main.js",
    mode: "production",
    output: {
        filename: "[name].[hash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [new MiniCssExtractPlugin({filename: '[name].[hash].css'}),new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: "./src/template.html"
    })],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            }
        ],
    },
}