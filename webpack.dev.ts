import { merge } from "webpack-merge";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
// in case you run into any typescript error when configuring `devServer`
import "webpack-dev-server";
import { baseConfig } from "./webpack.base";
const devConfig: webpack.Configuration = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        filename: "index.js",
        publicPath: "http://localhost:3001/",
        crossOriginLoading: "anonymous",
    },
    devtool: "cheap-module-source-map",
    devServer: {
        port: 3001,
        historyApiFallback: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
        },
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
            "process.env.DEBUG": JSON.stringify(process.env.DEBUG),
        }),
    ],
};
// devConfig overrides the baseConfig, if there is common attributes
const config = merge(baseConfig, devConfig);
export default config;
