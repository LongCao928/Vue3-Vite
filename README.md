# Vue 3 + Vite

这个模板应该可以帮助你开始在 Vite 中使用 Vue 3 进行开发。该模板使用 Vue 3 `<script setup>` SFCs，请查看脚本 [设置文档](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) 以了解更多信息。

## 建议的 IDE 设置

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## 开发

- 安装

```
npm install
```

- 运行

```
npm run dev
```

- 打包

```
npm run build
```

- 本地测试

```
npm run preview
```

## 目录

```
├─ .husky // git 钩子
├─ .vscode // vscode 配置文件
├─ public // 根目录静态资源(/访问)
├─ .env.xxx // 各环境的配置文件
├─ vite.config.js // 项目配置
├─ index.html // 入口文件
├─ .__ignore // 配置忽略文件
├─ .eslintrc.cjs // eslint配置
├─ .prettierrc.cjs // prettier配置
├─ .package.json // 项目配置文件
├─ .package-lock.json // 安装的依赖包指定版本(node_modules快照)
└─ src
  │─ App.vue // 根容器
  │─ main.js
  │─ style.css 样式文件
  ├─ components // 组件
  ├─ assets // 静态资源
  ├─ pages // 页面
  ├─ router // 路由
  ├─ store // pinia状态
  ├─ servers // 服务
  ├─ utils // 公用方法
```
