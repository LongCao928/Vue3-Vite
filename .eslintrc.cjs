module.exports = {
  env: {
    browser: true, // 支持浏览器环境的检测
    es2021: true, // 支持es2021语法的检测
    node: true // 支持node环境的检测
  },
  globals: {
    _: true
  },
  extends: [
    'eslint:recommended', // 使用eslint推荐的配置进行检测
    'plugin:vue/vue3-essential', // 支持vue3相关语法的检测
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest', // 解析文件的时候使用最新的ecmaVersion
    sourceType: 'module' // 文件是ES6模块规范
  },
  plugins: ['vue'],
  rules: {
    /** 第一个参数
     * "off"或0-关闭规则
     * "warn"或1-将该规则作为警告打开（不影响退出代码）
     * "error"或2-将规则作为错误打开（退出代码将为1）
     */
    // 配置自己项目特有的一些检测规则
    'comma-spacing': ['error', { before: false, after: true }], // 逗号之间必须有空格
    'quotes': ['error', 'single'],
    'camelcase': 1, // 驼峰命名
    'prettier/prettier': 0, // 优先采用.prettierrc.js的配置，不符合规则会提示错误
    // always（默认）：在语句末尾需要分号; never：不允许加分号
    // 'semi': ['error', 'always'],
    'semi': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
