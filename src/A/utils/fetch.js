/* eslint-disable no-useless-concat */
/* eslint-disable no-template-curly-in-string */

import { Toast } from 'antd-mobile'
import config from './appEnvConfig'
import JsBridge from './jsBridge'
const bridge = new JsBridge()


//32为UUID
function getUUID(a) {
    var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        num = "";
    for (var i = 0; i < 32; i++) {
        num += arr[parseInt(Math.random() * 36)];
    }
    return num;
}


class Fetch {
    static Fetch_last_url = {} // 之前请求的URL信息

    /**
     * Asynchronous         异步
     * @param url           请求地址api
     * @param params        请求参数
     * @param history       路由跳转对象
     * @param headers       请求头参数（非必传）
     */
    static async post(url, params = {}, history, headers = {}) {
        // 重复请求校验
        if (Fetch.Fetch_last_url[url] === JSON.stringify(params)) {
            return
        }
        Fetch.Fetch_last_url[url] = JSON.stringify(params)

        // headers['Access-Control-Allow-Origin'] = '*'
        // 获取token信息
        try {
            if (localStorage.sessionToken) {
                headers['token'] = localStorage.sessionToken + ''
            } else {
                // headers['token'] = config.token
                bridge.getToken((token) => {
                    headers['token'] = token
                })
            }
        } catch (error) { }
        // 获取平台类型
        headers['platformType'] = config.platformType

        params = Fetch.manageParams(params)

        // 参数封装
        let uriParams = new FormData()
        if (params) {
            Object.keys(params).forEach(key => { uriParams.append(key, params[key]) })
        }

        return new Promise((resolve, reject) => {
            fetch(config.postUrl + url, {
                method: 'POST',
                headers,
                mode: 'cors',
                body: uriParams,
            }).then((response) => {
                // console.log('response111 ====== ', response)
                Fetch.Fetch_last_url[url] = null
                if (response.ok) {
                    return response.json()
                } else {
                    reject({ success: false, errCode: '500', errDesc: '服务器异常，请稍后重试' })
                }
            }).then((respResult) => {
                // console.log('respResult ====== ', respResult)
                if (respResult && respResult.code) {
                    switch (respResult.code) {
                        case 200:   // 成功
                            resolve(respResult.ret || respResult)
                            break
                        case 406:   // 会话已过期，请重新登陆
                            Fetch.reLoginFunc(history)
                            break
                        case 2001:   // APP OR PC API 认证失败
                            resolve(respResult.msg)
                            Fetch.reLoginFunc(history)
                            break
                        default:
                            respResult.msg && Toast.info(respResult.msg)
                            reject(respResult)
                            break
                    }
                } else {
                    reject({ success: false, errCode: '500', msg: '网络异常，请稍后重试' })
                }
            }).catch((error) => {
                // console.log('response error ====== ', error)
                Fetch.Fetch_last_url[url] = null
                error.msg && Toast.info(error.msg)
                reject({ success: false, errCode: '500', error: error.msg })
            })
        })
    }
    /**
     * 加密接口
     * Asynchronous         异步
     * @param url           请求地址api
     * @param params        请求参数
     * @param history       路由跳转对象
     * @param headers       请求头参数（非必传）
     */
    static async encryptionPost(url, params = {}, history, headers = {}) {
        // 重复请求校验
        if (Fetch.Fetch_last_url[url] === JSON.stringify(params)) {
            return
        }
        Fetch.Fetch_last_url[url] = JSON.stringify(params)

        // headers['Access-Control-Allow-Origin'] = '*'
        // 获取token信息
        try {
            if (localStorage.sessionToken) {
                headers['token'] = localStorage.sessionToken + ''
            } else {
                // headers['token'] = config.token
                bridge.getToken((token) => {
                    headers['token'] = token
                })
            }
        } catch (error) { }
        // 获取平台类型
        headers['platformType'] = config.platformType

        params = Fetch.manageParams(params)

        // 参数封装
        let uriParams = new FormData()
        if (params) {
            Object.keys(params).forEach(key => { uriParams.append(key, params[key]) })
        }
        try {
            //获取时间戳
            const timestamp = Date.parse(new Date()) / 1000
            let newkey = []
            if (params) {
                newkey = Object.keys(params).sort()
            }
            console.log('newkey: ', newkey);
            let newObj = {}
            for (var i = 0; i < newkey.length; i++) {
                newObj[newkey[i]] = params[newkey[i]]
            }
            let content = ''
            //获取不重复值
            const randomUuid = getUUID()
            // eslint-disable-next-line no-useless-concat
            content += ('appId=' + '' + '&')
            content += ('method=' + '/' + url + '&')
            // content += ('version=' + '1.0.0' + '&')
            content += ('timestamp=' + timestamp + '&')
            content += ('token=' + headers['token'] + '&')
            content += ('encryptType=' + 4 + '&')
            content += ('randomuuid=' + randomUuid)
            let pp = ''
            for (let key in newObj) {
                console.log('newObj: ', newObj, newObj[key], newObj[key] instanceof File);
                if (newObj[key] === undefined || newObj[key] instanceof File) {
                    console.log('参数：' + key + ': ' + newObj[key])
                } else {
                    pp = pp + "&" + key + "=" + newObj[key]
                    console.log('参数：' + key + ': ' + newObj[key])
                }
            }
            if (content) {
                const sm2 = require("sm-crypto").sm2
                content = content + pp
                console.log('content: ', content);
                // console.log(content)
                let signature = await sm2.doSignature(content, config.privateKeySign, {
                    hash: true,
                    der: true
                })
                headers['signature'] = signature
                headers['encryptType'] = 4
                headers['timestamp'] = timestamp
                headers['randomuuid'] = randomUuid
                headers['method'] = '/' + url
            }
        } catch (err) {
            if (err) console.log(err)
        }
        return new Promise((resolve, reject) => {
            fetch(config.postUrl + url, {
                method: 'POST',
                headers,
                mode: 'cors',
                body: uriParams,
            }).then((response) => {
                // console.log('response111 ====== ', response)
                Fetch.Fetch_last_url[url] = null
                if (response.ok) {
                    return response.json()
                } else {
                    reject({ success: false, errCode: '500', errDesc: '服务器异常，请稍后重试' })
                }
            }).then((respResult) => {
                // console.log('respResult ====== ', respResult)
                if (respResult && respResult.code) {
                    switch (respResult.code) {
                        case 200:   // 成功
                            resolve(respResult.ret || respResult)
                            break
                        case 406:   // 会话已过期，请重新登陆
                            Fetch.reLoginFunc(history)
                            break
                        case 2001:   // APP OR PC API 认证失败
                            resolve(respResult.msg)
                            Fetch.reLoginFunc(history)
                            break
                        default:
                            respResult.msg && Toast.info(respResult.msg)
                            reject(respResult)
                            break
                    }
                } else {
                    reject({ success: false, errCode: '500', msg: '网络异常，请稍后重试' })
                }
            }).catch((error) => {
                // console.log('response error ====== ', error)
                Fetch.Fetch_last_url[url] = null
                error.msg && Toast.info(error.msg)
                reject({ success: false, errCode: '500', error: error.msg })
            })
        })
    }
    /**
     * 参数处理（处理数组或对象的value，格式：数组arr[i]、对象obj.key）
    */
    static manageParams(params) {
        for (let key in params) {
            let item = params[key]
            if (item && item !== '' && item !== null && item !== undefined) {
                if (Array.isArray(item)) {
                    // 数组
                    item.forEach((val, i) => {
                        if (val.constructor === Object || val.constructor === File || typeof val === 'string' || typeof val === 'number') {
                            params[`${key}[${i}]`] = val
                        }
                    })

                    delete params[key]
                    Fetch.manageParams(params)
                } else if (item.constructor === Object && !_isImgFile(item)) {
                    // 对象
                    for (let i in item) {
                        params[`${key}.${i}`] = item[i]
                    }
                    delete params[key]
                    Fetch.manageParams(params)
                }
            }
        }

        let allString = false
        for (let key in params) {
            let item = params[key]
            if (typeof item === 'string' || typeof item === 'number' || item === null || item === undefined || item.constructor === File) {
                allString = true
            }
        }
        if (allString) {
            return params
        }

        // 非图片
        function _isImgFile(obj) {
            if (obj['size'] && obj['type'] && obj['name']) {
                return true
            }
            return false
        }
    }

    /**
     * 退出登录
     */
    static reLoginFunc(history) {
        localStorage.removeItem('sessionToken')
        history && history.replace('/406')
    }
}

export default Fetch