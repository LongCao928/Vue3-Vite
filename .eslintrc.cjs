module.exports = {
    "env": {
        "browser": true, // 支持浏览器环境的检测
        "es2021": true, // 支持es2021语法的检测
        "node": true // 支持node环境的检测
    },
    "globals": {
        _: true
    },
    "extends": [
        "eslint:recommended", // 使用eslint推荐的配置进行检测
        "plugin:vue/vue3-essential", // 支持vue3相关语法的检测
        "plugin:prettier/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest", // 解析文件的时候使用最新的ecmaVersion
        "sourceType": "module"  // 文件是ES6模块规范
    },
    "plugins": [
        "vue"
    ],
    "rules": { // 配置自己项目特有的一些检测规则
      "comma-spacing": ["error", { "before": false, "after": true }], // 逗号之间必须有空格
    //   "quotes": ["error", "double"]
    }
}
