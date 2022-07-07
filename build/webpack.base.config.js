const path = require("path");
const Webpack = require("webpack");
const utils = require('./utils');
const NODE_ENV_VALUE = process.env.NODE_ENV;

module.exports = {

    // 入口
    entry: {

    },

    // 出口
    output: {
        path: utils.resolve("../dist"),
        filename: "static/js/[name].js",
        publicPath: "/"
    },

    // 模块
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpg|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 20000,
                    name: 'static/images/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },

    resolve: {
        extensions: ['.js', 'jsx', '.json', '.jpg'],
        alias: {
            '@': path.join(__dirname, '..', "src")
        }
    },

    plugins: [
        new Webpack.DefinePlugin({
            'process.env': {
                APP_ENV: JSON.stringify(NODE_ENV_VALUE)
            },
        }),
    ]
}