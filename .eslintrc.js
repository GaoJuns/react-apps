module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            arrowFunctions: true,
            defaultParams: true,
            jsx: true,
        },
        ecmaVersion: 8,
        requireConfigFile: false,
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-empty': 2, // 禁止空语句块
        'func-style': 0,
        'no-console': ['error', { allow: ['log'] }], // 允许打印
        'react/prop-types': 0,
        // 允许在 .js 和 .jsx 文件中使用  jsx
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        // jsx > 紧跟着属性
        'react/jsx-closing-bracket-location': [1, 'after-props'],
        // 不区分是否是 无状态组件
        'react/prefer-stateless-function': 0,
    },
    parser: '@babel/eslint-parser',
};
