const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./build/index.html",
        }),
    ],
    devServer: {
        historyApiFallback: true,
    },
    externals: {
        config: JSON.stringify({
            apiUrl: "/api",
        }),
    },
};
