import * as webpack from "webpack";
import path from "path";
export const baseConfig: webpack.Configuration = {
    module: {
        rules: [
            {
                test: /\.(js?|tsx?)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    //   options: {
                    //     presets: [
                    //       "@babel/preset-react",
                    //       "@babel/preset-env",
                    //       "@babel/preset-typescript",
                    //     ],
                    //     plugins: ["@babel/plugin-transform-runtime"],
                    //   },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                ],
                include: /\.module\.css$/,
            },
        ],
    },
    resolve: {
        extensions: [".js", ".tsx", ".ts"],
        modules: ["node_modules", path.join(__dirname, "src"), "components"], // this will help us resolving modules under as if they were from node
    },
};