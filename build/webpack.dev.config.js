const webpackMerge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const utils = require('./utils');
const entryConfig = require('./entry.dev.config');
const baseWebpackConfig = require('./webpack.base.config');
const appName = utils.getProjectName();

module.exports = webpackMerge.merge(baseWebpackConfig, {
    mode: 'development',
    entry: entryConfig.getBuildEntry(),
    output: {
        path: entryConfig.getPrdOutPutPath(),
        filename: 'static/js/[name].js',
        publicPath: '/',
    },
    module: {
        rules: utils.cssLoaders(),
    },
    plugins: [
        ...entryConfig.getHtmlWebpackPluginList(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    'You application is running here http://localhost:8080',
                ],
                notes: [
                    'Some additionnal notes to be displayed unpon successful compilation',
                ],
            },
            clearConsole: true,
        }),
    ],
    devtool: '#eval-source-map',
    stats: 'errors-only',
    devServer: {
        port: '8080',
        hot: true,
        open: appName ? ['/' + appName] : false,
        compress: false,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
            progress: true,
        },
        historyApiFallback: appName
            ? true
            : {
                rewrites: entryConfig.getRewritesList(),
            },
        proxy: {
            // 接口请求代理
        },
    },
});
