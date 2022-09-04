const chalk = require("chalk");
const webpack = require("webpack")
const ora = require("ora");
const utils = require('./utils');

// 未传参错误提示
const PROJECT_NAME = utils.getProjectName();
if (!PROJECT_NAME) {
    console.log(chalk.yellow(`
        构建错误！！！！

        ------------------------------------

        错误信息：未选择构建应用...
        命令格式：npm run build --appName=xxxxx(项目名)

        ------------------------------------
    `))
    process.exit();
}

// 项目不存在处理
if (PROJECT_NAME) {
    const projectList = utils.getProjectList();

    if (!projectList.includes(PROJECT_NAME)) {
        console.log(chalk.yellow(`
        构建错误！！！！

        ------------------------------------

        错误信息：不存在 ${PROJECT_NAME} 项目

        ------------------------------------
        `))
        process.exit();
    }
}

// 执行构建
const WebpackConfig = require("./webpack.prod.config");
const NODE_ENV_VALUE = process.env.NODE_ENV;
const envTextTarget = {
    test: '测试环境',
    production: '生产环境'
}

console.log(chalk.cyan(`
        开始构建！！！

        ------------------------------------

        当前构建项目：${PROJECT_NAME}
        当前构建环境：${envTextTarget[NODE_ENV_VALUE]}

        ------------------------------------
    `))


// 启动动画
const spinner = ora(chalk.yellow(`
        正在构建.....

        ------------------------------------
    `));
spinner.start();

webpack(WebpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err;

    // 控制台输出打包成功信息
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n')

    // 构建完成输入
    console.log(chalk.cyan(`
        ------------------------------------

        构建完成...
        请在dist目录下查看

        cd dist/xxx(项目名)
        http-server

        ------------------------------------
    `))

    process.exit();
})