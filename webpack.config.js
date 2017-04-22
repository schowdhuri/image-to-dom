const path = require("path");
const webpack = require("webpack")

module.exports = {
    entry: "./app/helper.js",
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    output: {
        filename: "image-to-dom.min.js",
        path: path.resolve(__dirname, "dist"),
        library: "ImageToDOM",
        libraryTarget: "umd"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};
