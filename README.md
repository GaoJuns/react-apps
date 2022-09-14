## 一、webpack-react-apps

react 多应用打包模板，适用于开发营销活动H5页面等的项目。

## 二、创建
```js
    npm run create --appName=xxx(src下项目名)
```

## 三、运行
- **1.运行指定项目：**
```js
    1. npm install
    2. npm start --appName=xxx(src下项目名)
    3. localhost:8080
```

- **2.运行所有项目：**
```js
    1. npm install
    2. npm start
    3. localhost:8080/xxx(src下项目名)
```
> 如果页面404，请在路由 BrowserRouter 设置 basename='/xxx(src下项目名)'


## 四、构建
```js
    测试环境：
    npm run build:test --appName=xxx(src下项目名)

    生产环境：
    npm run build --appName=xxx(src下项目名)

    生成分析文件：
    npm run build --appName=xxx(src下项目名) --report
```

## 五、注意

 - **node版本:** v14.17.x。
 - **src** 下项目目录中必须存在 **index.html** 与 **favicon.ico** 文件，否则构建会失败。
