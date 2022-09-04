## 一、webpack-react-apps

react 多应用打包模板，适用于开发营销活动H5页面等的项目。

## 二、创建
```js
    npm run create --appName=xxx(src下项目名)
```

## 三、运行
```js
    1. npm install
    2. npm run dev [--appName=xxx(src下项目名)]--设置运行指定项目，不设置运行全部项目
    3. localhost:8080 或 localhost:8080/xxx(src下项目名)
```


## 四、构建
```js
    测试环境：
    npm run build:test --appName=xxx(src下项目名)

    生产环境：
    npm run build --appName=xxx(src下项目名)

    生成分析文件：
    npm run build --appName=xxx(src下项目名) --report
```

