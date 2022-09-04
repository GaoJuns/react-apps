console.log(process.env.NODE_ENV)

/**
 * 配置项
 */
var config = {
    env: 'test', // 当前环境
    platformType: 1, // 平台类型,可选值:1,2 1-移动端 , 2-PC端
}

let appConfig = {
    // 开发环境
    dev: {
        url: ''
    },
    // 测试环境
    test: {
        url: '',
    },
    // 线上环境
    online: {
        url: '',
    }
}

config = Object.assign(config, appConfig[config.env])

export default config
