// const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/js/app.js'),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        // publicPath: "/assets/",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src/js"),
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ]
            }
        ]
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: 'index.html'
    //     })
    // ]
}