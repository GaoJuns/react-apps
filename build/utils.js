const path = require('path');
const glob = require('glob');
const pxtorem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(dir) {
    return path.resolve(__dirname, dir);
}

function assetsPath(_path) {
    return path.posix.join('static', _path);
}

function getProjectName() {
    return process.env.npm_config_appName;
}

function needAnalyzer() {
    return process.env.npm_config_report;
}

function cssLoaders(options) {
    options = options || {};

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap,
        },
    };

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            parser: 'postcss',
            plugins: () => [
                autoprefixer({
                    broswers: ['last 5 versions', '> 0.05%'],
                    remove: false,
                }),
                pxtorem({
                    rootValue: 75,
                    selectorBlackList: [], //过滤
                    propList: ['*'],
                    exclude: /node_modules/i,
                }),
            ],
        },
    };

    function _initLoader(loader, loaderOptions) {
        const loaders = [cssLoader, postcssLoader];
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap,
                }),
            });
        }
        if (options.extract) {
            return [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        reloadAll: true,
                    },
                },
            ].concat(loaders);
        } else {
            return ['style-loader'].concat(loaders);
        }
    }

    const target = {
        css: _initLoader(),
        less: _initLoader('less'),
    };

    const output = [];
    for (let key in target) {
        const loader = target[key];
        output.push({
            test: new RegExp('\\.' + key + '$'),
            use: loader,
        });
    }

    return output;
}

function getProjectList() {
    let whiteList = ['assets'];
    let projectList = glob.sync('././src/*');

    for (let index = 0; index < projectList.length; index++) {
        let item = projectList[index];
        let tmpList = item.split('/');
        projectList[index] = tmpList[tmpList.length - 1];
    }

    whiteList.map((v) => {
        projectList = projectList.filter((n) => {
            return v !== n;
        });
    });

    return projectList;
}

module.exports = {
    resolve,
    assetsPath,
    needAnalyzer,
    cssLoaders,
    getProjectList,
    getProjectName,
};
