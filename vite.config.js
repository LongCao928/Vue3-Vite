
// 当以命令行方式运行 vite 时，Vite 会自动解析项目根目录下名为 vite.config.js 的文件。--config 选项指定配置文件。


import { defineConfig } from 'vite'
// import { resolve } from 'path'
import legacy from '@vitejs/plugin-legacy'
// import image from '@rollup/plugin-image'
// @vitejs/plugin-vue: Vue3 单文件组件支持
import vue from '@vitejs/plugin-vue'

// @vitejs/plugin-vue-jsx 提供 Vue 3 JSX 支持（通过 专用的 Babel 转换插件）
// @vitejs/plugin-vue2 提供对 Vue 2 的单文件组件支持。
// @vitejs/plugin-react 使用 esbuild 和 Babel，使用一个微小体积的包脚注可以实现极速的 HMR，同时提升灵活性，能够使用 Babel 的转换管线。
// @vitejs/plugin-react-swc 在开发时会将 Babel 替换为 SWC。在构建时，若使用了插件则会使用 SWC+esbuild，若没有使用插件则仅会用到 esbuild。
// @vitejs/plugin-legacy 为打包后的文件提供传统浏览器兼容性支持。

/*export default defineConfig(({ command, mode, ssrBuild }) => {
  if(command === 'serve') {
    return {
      // dev 独有配置
      plugins: [
        vue()
      ]
    }
  } else {
    // command === 'build'
    return {
      // build 独有配置
    }
  }
})*/

// https://vitejs.dev/config/
export default defineConfig({
  // 开发服务器选项
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
    open: true,
    proxy: {
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo
      '/foo': 'http://localhost:4567',
    },
  },
  // 构建选项
  build: {
    // target 支持原生ES 模块、原生ESM 动态导入和 import.meta 的浏览器。
    // Vite 替换为 ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']
    // 转换过程由 esbuild 执行，并且此值应该是一个合法的 esbuild 目标选项。
    // 自定义目标也可以是一个 ES 版本（例如：es2015）、一个浏览器版本（例如：chrome58）或是多个目标组成的一个数组。
    target: 'modules', 
    outDir: 'dist', // 指定输出路径(相对于项目根目录)
    assetsDir: 'assets', // 指定生成静态资源的存放路径（相对于 build.outDir）。在 库模式 下不能使用。
    assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
    // cssCodeSplit启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时插入。
    // 如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
    cssCodeSplit: true, 
    // cssTarget: 'modules', // 此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target，此处的 target 并非是用于 JavaScript 转写目标。
    sourcemap: false, // 构建后是否生成 source map 文件。 boolean | 'inline' | 'hidden'
    // manifest 设置为 true，构建后将会生成 manifest.json 文件，包含了没有被 hash 过的资源文件名和 hash 后版本的映射。
    // 可以为一些服务器框架渲染时提供正确的资源引入链接。当该值为一个字符串时，它将作为 manifest 文件的名字。
    manifest: true,
    // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    // 若 outDir 在根目录之外则会抛出一个警告避免意外删除掉重要的文件。
    // 可以设置该选项来关闭这个警告。该功能也可以通过命令行参数 --emptyOutDir 来使用。
    emptyOutDir: true,
    // 启用/禁用 gzip 压缩大小报告。
    // 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
    reportCompressedSize: true,
  },
  // 预览选项
  preview: {
    // host: 'locahost', // 默认为 server.host，设置为 0.0.0.0 或 true 会监听所有地址，包括局域网和公共地址。
    port: 4173, // 指定开发服务器端口。注意，如果设置的端口已被使用，Vite 将自动尝试下一个可用端口.
    strictPort: false, // 设置为 true 时，如果端口已被使用，则直接退出，而不会再进行后续端口的尝试。
    https: false, // 启用 TLS + HTTP/2。注意，只有在与 server.proxy 选项 同时使用时，才会降级为 TLS。
    // 开发服务器启动时，自动在浏览器中打开应用程序。
    // 当该值为字符串时，它将被用作 URL 的路径名。
    // 如果你想在你喜欢的某个浏览器打开该开发服务器，你可以设置环境变量 process.env.BROWSER （例如 firefox）。
    open: 'preview',
    // 如果 key 以 ^ 开头，它将被识别为 RegExp，其中 configure 选项可用于访问代理实例。
    proxy: {},
    // 为开发服务器配置 CORS。此功能默认启用并支持任何来源。
    // cors: server.cors, 
    // 指明服务器返回的响应头。
    headers: {}
  },
  // 优化依赖选项
  optimizeDeps: {
    // 默认情况下，Vite 会抓取你的 index.html 来检测需要预构建的依赖项（忽略了node_modules、build.outDir、__tests__ 和 coverage）。
    // 当显式声明了 optimizeDeps.entries 时默认只有 node_modules 和 build.outDir 文件夹会被忽略。
    // 如果还需忽略其他文件夹，你可以在模式列表中使用以 ! 为前缀的、用来匹配忽略项的模式。
    // entries: '',
    // 在预构建中强制排除的依赖项。
    // exclude: [''],
    // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
    // include: [''],
    // esbuildOptions: '',   // 在部署扫描和优化过程中传递给 esbuild 的选项。
    force: false, // 设置为 true 可以强制依赖预构建，而忽略之前已经缓存过的、已经优化过的依赖。
  },
  // mode: 'development',
  // build: {
  //   rollupOptions: {
  //     input: {

  //     }
  //   }
  // }, 
  plugins: [
    vue(),
    // 为传统浏览器提供支持，@vitejs/plugin-legacy
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    // 为了与某些 Rollup 插件兼容，可能需要强制修改插件的执行顺序，或者只在构建时使用。(这应该是 vite 插件的实现细节)
    // 可以通过 enforce 修饰符来强制插件的位置：
    // pre：在 Vite 核心插件之前调用该插件
    // 默认：在 Vite 核心插件之后调用该插件
    // post：在 Vite 构建插件之后调用该插件
    // {
      // ...image(),
      // enforce: 'pre',
      // apply: 'serve'
    // }
    // 默认情况下插件在开发(serve)和生产(build)模式都会调用。
    // 如果插件在服务或构建期间按需使用，使用 apply 属性指明模式。
  ],
})


// 在本地查看该构建产物是否正常可用。
// npm run build 打包完成后，运行 npm run preview 在本地测试该应用。
// vite preview 会在本地启动一个静态 Web 服务器，将 dist 文件夹运行在 http://localhost:4173。(--port 配置运行端口)


/* 环境变量
 * vite 在一个特殊的 import.meta.env 对象上暴露环境变量。下面是一些在所有情况下都可以使用的内建变量：
 * import.meta.env.MODE: {string}应用运行的模式
 * import.meta.env.BASE_URL: {string}部署应用时的基本URL。它由 base 配置项决定。
 * import.meta.env.PROD: {boolean}是否运行在生产环境
 * import.meta.env.DEV: {boolean}是否运行在开发环境(永远与 import.meta.env.PROD 相反)
 * import.meta.env.SSR: {boolean}应用是否运行在server上
 * 
 * 在生产环境中，这些环境变量会在构建时被静态替换，因此在使用它们时请使用完全静态的字符串。动态的 key 将无法生效。
 * 例如，动态 key 取值 import.meta.env[key] 是无效的。
 * 它还将替换出现在 JavaScript 和 Vue 模板中的字符串。
 * 对于 Javascript 字符串，可以使用 unicode 零宽度空格来分割这个字符串：'import.meta\u200b.env.MODE'。
 * 对于 Vue 模块或其他编译到 JavaScript 字符串的 HTML，可以使用 <wbr> 标签：import.meta.<wbr>env.MODE。
 * 
 * .env文件
 * - .env 所有情况下都会加载
 * - .env.local 所有情况下都会加载，但会被 git 忽略
 * - .env.[mode] 只在指定模式下加载
 * - .env.[mode].local 只在指定模式下加载，但会被 git 忽略
 * 
 * 一份用于指定模式的文件（例如 .env.production）会比通用形式的优先级更高（例如 .env）。
 * .env 类文件会在 Vite 启动一开始时被加载，而改动会在重启服务器后生效。
 * 
 * 加载的环境变量也会通过 import.meta.env 以字符串形式暴露给客户端源码。
 * 为了防止意外地将一些环境变量泄漏到客户端，只有以 _VITE 为前缀的变量才会暴露给经过 vite 处理的代码。
 * 
 * 请注意，如果想要在环境变量中使用 $ 符号，则必须使用 \ 对其进行转义。
 * 
 * vite 还支持在 html 文件中替换环境变量。 import.meta.env 中的任何属性都可以通过特殊的 %ENV_NAME% 语法在 html 文件中使用。
 * <h1>Vite is running in %MODE%</h1>
 * <p>Using data from %VITE_API_URL%</p>
 * 如果环境变量不存在，则会被忽略而不替换。
 */


/* 模式
 * 默认情况下，开发服务器 (dev 命令) 运行在 development （开发）模式，build 命令运行在 production（生产）模式。
 * 这意味着 vite build 时，它会自动加载 .env.production 中可能存在的环境变量。
 * --mode 选项标志来覆盖命令使用的默认模式。
 * vite build --mode staging (新建一个.env.staging 文件)
 * 
 * 通过使用不同的模式和对应的 .env 文件配置来改变 vite build，用以运行开发模式的构建。
 * # .env.testing
 * NODE_ENV=development
 */


/* 环境变量通常可以从 process.env 获得。
 * vite 默认是不加载 .env 文件，因为这些文件需要在执行完 vite 配置后才能确定加载哪一个。
 * 当你的确需要时，可以使用 vite 导出的 loadEnv 函数来加载指定的 .env 文件。
 */


// resolve.extensions 导入时想要省略的扩展名列表。
// 默认：['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']














