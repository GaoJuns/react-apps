const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const utils = require('./utils');

const PROJECT_NAME = utils.getProjectName();
const PROJECT_LIST = utils.getProjectList();

// 未传参处理
if (!PROJECT_NAME || PROJECT_NAME === 'true') {
    console.log(
        chalk.yellow(`
        创建失败！！！！

        ------------------------------------

        错误信息：未输入应用名称...
        命令格式：npm run create --appName=xxxxx(项目名)

        ------------------------------------
    `)
    );
    process.exit();
}

// 存在相同名称的项目
if (PROJECT_LIST.indexOf(PROJECT_NAME) != -1) {
    console.log(
        chalk.yellow(`
        创建失败！！！！

        ------------------------------------

        错误信息：${PROJECT_NAME} 项目已存在...

        ------------------------------------
    `)
    );
    process.exit();
}

// 开始创建
const major = process.version.match(/v([0-9]*).([0-9]*)/)[1];
const minor = process.version.match(/v([0-9]*).([0-9]*)/)[2];

/**
 * 文件夹复制
 * @param {string} source 源文件夹
 * @param {string} target 目标文件夹
 * @param {function} cb 回调
 */
function cpSync(source, target, cb) {
    // 判断node版本不是16.7.0以上的版本
    // 则进入兼容处理
    // 这样处理是因为16.7.0的版本支持了直接复制文件夹的操作
    if (Number(major) < 16 || (Number(major) == 16 && Number(minor) < 7)) {
        // 如果存在文件夹 先递归删除该文件夹
        if (fs.existsSync(target)) fs.rmSync(target, { recursive: true });

        // 新建文件夹 递归新建
        fs.mkdirSync(target, { recursive: true });

        // 读取源文件夹
        let rd = fs.readdirSync(source);
        for (const fd of rd) {
            // 循环拼接源文件夹/文件全名称
            let sourceFullName = source + '/' + fd;
            // 循环拼接目标文件夹/文件全名称
            let targetFullName = target + '/' + fd;
            // 读取文件信息
            let lstatRes = fs.lstatSync(sourceFullName);
            // 是否是文件
            if (lstatRes.isFile())
                fs.copyFileSync(sourceFullName, targetFullName);
            // 是否是文件夹
            if (lstatRes.isDirectory()) cpSync(sourceFullName, targetFullName);
        }
    } else fs.cpSync(source, target, { force: true, recursive: true });

    // 执行回调
    cb && cb();
}

// 执行
const source = path.resolve(__dirname, '../static/create-app-template');
const target = path.resolve(__dirname, `../src/${PROJECT_NAME}`);

cpSync(source, target, function () {
    console.log(
        chalk.cyan(`
        ------------------------------------

        创建完成...

        启动命令：npm run start --appName=${PROJECT_NAME}

        ------------------------------------
    `)
    );
    process.exit();
});
