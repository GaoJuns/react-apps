const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const utils = require('./utils');

// 获取需要打包的文件入口
function getBuildEntry() {
    const PROJECT_NAME = utils.getProjectName();
    let entry = {};
    if (PROJECT_NAME) {
        entry[PROJECT_NAME] = "./src/" + PROJECT_NAME + "/index.js";
    }
    return entry;
}

// 获取htmlwebpackplugin列表
function getHtmlWebpackPluginList(options = {}) {

    const extractOptions = {
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
    }

    const PROJECT_NAME = utils.getProjectName();
    const HtmlWebpackPluginList = [];

    if (PROJECT_NAME) {
        HtmlWebpackPluginList.push(new HtmlWebpackPlugin(Object.assign({
            filename: utils.resolve('./../dist/' + PROJECT_NAME + '/index.html'),
            template: utils.resolve("./../src/" + PROJECT_NAME + "/index.html"),
            favicon: utils.resolve('./../src/' + PROJECT_NAME + '/favicon.ico'),
            inject: true,
            chunks: ['vendors', PROJECT_NAME],
        }, extractOptions)));
    }

    if (options.extract) {
        HtmlWebpackPluginOptions = Object.assign(HtmlWebpackPluginOptions, extractOptions)
    }

    return HtmlWebpackPluginList;
}

// 打包的输出目录
function getPrdOutPutPath() {
    const PROJECT_NAME = utils.getProjectName();
    return utils.resolve(`../dist/${PROJECT_NAME}`);
}

// 打包资源的前缀路径
function getPublicPath() {
    return `./`
    // const PROJECT_NAME = utils.getProjectName();
    // return `/${PROJECT_NAME}`
}

// 获取开发环境重定向的规则，只在开发环境中使用
function getRewritesList() {
    const PROJECT_NAME = utils.getProjectName();
    const rewrites = [];
    rewrites.push({
        from: new RegExp('^\/' + PROJECT_NAME),
        to: utils.resolve('/' + PROJECT_NAME + '/index.html')
    })

    return rewrites;
}

// 生成分析报告
function getAnalyzerConfig() {
    const analyzerConfig = {
        analyzerMode: 'disabled',
        reportFilename: 'report.html',
        defaultSizes: 'gzip',
        generateStatsFile: false,
        openAnalyzer: false,
        statsFilename: 'stats.json',
    };

    if (utils.needAnalyzer()) {
        analyzerConfig.analyzerMode = 'static';
        analyzerConfig.openAnalyzer = true;
    };

    return new BundleAnalyzerPlugin(analyzerConfig);
}

module.exports = {
    getBuildEntry,
    getHtmlWebpackPluginList,
    getPrdOutPutPath,
    getPublicPath,
    getRewritesList,
    getAnalyzerConfig
}