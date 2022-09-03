const HtmlWebpackPlugin = require("html-webpack-plugin");
const chalk = require("chalk");
const utils = require('./utils');

// 是否存在此项目
function hasApp() {
    const PROJECT_NAME = utils.getProjectName();

    if (PROJECT_NAME) {
        const projectList = utils.getProjectList();

        if (!projectList.includes(PROJECT_NAME)) {
            console.log(chalk.yellow(`
            启动错误！！！！

            ------------------------------------

            错误信息：不存在 ${PROJECT_NAME} 项目

            ------------------------------------
            `))
            process.exit();
        }
        return PROJECT_NAME;
    }
    return null;
}

// 打印启动项目
function log(appName) {
    console.log(chalk.green(`
    正在启动！！！！

    ------------------------------------

    启动项目： ${appName || '全部'} 项目

    ------------------------------------
    `));
}

// 获取需要打包的文件入口
function getBuildEntry() {
    const entry = {};
    const appName = hasApp();

    if (appName) {
        entry[appName] = `./src/${appName}/index.js`
        log(appName);
    } else {
        const projectList = utils.getProjectList();

        for (let index in projectList) {
            const PROJECT_NAME = projectList[index]
            entry[PROJECT_NAME] = `./src/${PROJECT_NAME}/index.js`
        }
        log();
    }

    return entry
}

// 获取htmlwebpackplugin列表
function getHtmlWebpackPluginList(options = {}) {

    const extractOptions = {
        minify: {
            removeComments: true,               //去注释
            collapseWhitespace: true,           //压缩空格
            removeAttributeQuotes: true         //去除属性引用
        },
    }

    const appName = hasApp();
    const HtmlWebpackPluginList = [];

    if (appName) {

        const HtmlWebpackPluginOptions = {
            filename: utils.resolve('./../dist/index.html'),
            template: utils.resolve("./../public/index.html"),
            favicon: utils.resolve('./../public/favicon.ico'),
            inject: true,
            chunks: [appName],
        };

        if (options.extract) {
            HtmlWebpackPluginOptions = Object.assign(HtmlWebpackPluginOptions, extractOptions)
        }

        HtmlWebpackPluginList.push(new HtmlWebpackPlugin(HtmlWebpackPluginOptions))
    } else {
        const projectList = utils.getProjectList();

        for (let index in projectList) {
            const PROJECT_NAME = projectList[index];
            const HtmlWebpackPluginOptions = {
                filename: utils.resolve('./../dist/' + PROJECT_NAME + '/index.html'),
                template: utils.resolve("./../public/index.html"),
                favicon: utils.resolve('./../public/favicon.ico'),
                inject: true,
                chunks: [PROJECT_NAME],
            };
            if (options.extract) {
                HtmlWebpackPluginOptions = Object.assign(HtmlWebpackPluginOptions, extractOptions)
            }
            HtmlWebpackPluginList.push(new HtmlWebpackPlugin(HtmlWebpackPluginOptions))
        }
    }

    return HtmlWebpackPluginList;
}

// 打包的输出目录
function getPrdOutPutPath() {
    return utils.resolve(`../dist`);
}

// 打包资源的前缀路径
function getPublicPath() {
    return `/`
}

// 获取开发环境重定向的规则，只在开发环境中使用
function getRewritesList() {
    const projectList = utils.getProjectList();

    const rewrites = [];
    for (let index in projectList) {
        const PROJECT_NAME = projectList[index]
        rewrites.push({
            from: new RegExp('^\/' + PROJECT_NAME),
            to: utils.resolve('/' + PROJECT_NAME + '/index.html')
        })
    }
    return rewrites;
}


module.exports = {
    getBuildEntry,
    getHtmlWebpackPluginList,
    getPrdOutPutPath,
    getPublicPath,
    getRewritesList
}