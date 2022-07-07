const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve(dir) {
    return path.resolve(__dirname, dir)
}

function assetsPath(_path) {
    return path.posix.join("static", _path)
}

function getProjectName() {
    return process.env.npm_config_name
}

function needAnalyzer() {
    return process.env.npm_config_report
}

function cssLoaders(options) {

    options = options || {};

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };

    function _initLoader(loader, loaderOptions) {
        const loaders = [cssLoader, 'postcss-loader'];
        if (loader) {
            loaders.push({
                loader: loader + "-loader",
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }
        if (options.extract) {
            return [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        reloadAll: true,
                    }
                }
            ].concat(loaders);
        } else {
            return ['style-loader'].concat(loaders)
        }
    }

    const target = {
        css: _initLoader(),
        less: _initLoader("less")
    }

    const output = [];
    for (let key in target) {
        const loader = target[key];
        output.push({
            test: new RegExp('\\.' + key + '$'),
            use: loader
        })
    }

    return output;
}

function getProjectList() {
    let whiteList = ['assets'];
    let projectList = glob.sync("././src/*");

    for (let index = 0; index < projectList.length; index++) {
        let item = projectList[index];
        let tmpList = item.split("/");
        projectList[index] = tmpList[tmpList.length - 1];
    }

    whiteList.map(v => {
        projectList = projectList.filter((n) => { return v !== n })
    })

    return projectList;
}


module.exports = {
    resolve,
    assetsPath,
    needAnalyzer,
    cssLoaders,
    getProjectList,
    getProjectName,
}