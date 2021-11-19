/* eslint-disable no-undef */
const isTest = String(process.env.NODE_ENV) === "test";
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                //   modules: 'commonjs',
                modules: isTest ? "commonjs" : false,
                targets: "> 0.5%",
            },
        ],
        "@babel/preset-typescript",
        "@babel/preset-react",
    ],
    plugins: [
        "@babel/transform-runtime",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-syntax-dynamic-import",
    ],
};