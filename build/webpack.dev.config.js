const webpackMerge = require('webpack-merge');
const utils = require('./utils');
const entryConfig = require('./entry.dev.config');
const baseWebpackConfig = require('./webpack.base.config');

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
    plugins: [...entryConfig.getHtmlWebpackPluginList()],
    devtool: '#eval-source-map',
    devServer: {
        port: '8080',
        hot: true,
        open: true,
        compress: false,
        historyApiFallback: true,
        proxy: {
            // 接口请求代理
        },
    },
});
