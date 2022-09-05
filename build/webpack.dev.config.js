const webpackMerge = require('webpack-merge');
const utils = require('./utils');
const entryConfig = require('./entry.dev.config');
const baseWebpackConfig = require('./webpack.base.config');
const PROJECT_NAME = utils.getProjectName();

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
        historyApiFallback: PROJECT_NAME
            ? true
            : {
                rewrites: entryConfig.getRewritesList(),
            },
        proxy: {
            // 接口请求代理
        },
    },
});
