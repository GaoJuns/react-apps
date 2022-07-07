const webpackMerge = require("webpack-merge");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const utils = require("./utils");
const entryConfig = require('./entry.prod.config');
const baseWebpackConfig = require("./webpack.base.config");

module.exports = webpackMerge.merge(baseWebpackConfig, {
    mode: "production",
    entry: entryConfig.getBuildEntry(),
    output: {
        path: entryConfig.getPrdOutPutPath(),
        filename: utils.assetsPath("js/[name].[hash].js"),
        chunkFilename: utils.assetsPath("js/[name].[chunkhash].js"),
        publicPath: entryConfig.getPublicPath()
    },
    module: {
        rules: utils.cssLoaders({ extract: true, sourceMap: true })
    },
    plugins: [

        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[hash].css'),
            chunkFilename: utils.assetsPath('css/[id].[chunkhash].css'),
        }),
        new CleanWebpackPlugin(),
        entryConfig.getAnalyzerConfig(),
        ...entryConfig.getHtmlWebpackPluginList(),

        // CDN 引入
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: "react",
                    entry: "https://unpkg.com/react@18/umd/react.production.min.js",
                    global: "React"
                },
                {
                    module: "react-dom",
                    entry: "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
                    global: "ReactDOM"
                }
            ]
        })
    ],
    optimization: {
        minimizer: [
            // 压缩JS
            new UglifyJsPlugin({
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        unused: true,
                        drop_debugger: true,
                        drop_console: true,
                    },
                    output: {
                        comments: false // 去掉注释
                    }
                }
            }),

            // 压缩CSS
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    discardComments: { removeAll: true } // 移除注释
                }
            })
        ],

        // 拆包分割代码
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 5,
            automaticNameDelimiter: '~',
            name: true,
            // 默认的配置
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
            },
        },
        runtimeChunk: {
            name: 'manifest'
        }
    }
})