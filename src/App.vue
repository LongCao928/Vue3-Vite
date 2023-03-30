<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <!-- public 文件夹下的文件位于项目根目录，开发时通过 / 可直接访问到，并且打包时会被完整复制到目标目录的根目录下。 -->
      <!-- 目录默认是 <root>/public，但可以通过 publicDir 选项 来配置。 -->
      <img src="/vite.svg" class="logo" alt="Vite logo" />
      <!-- 引入 public 中的资源永远应该使用根绝对路径 —— 举个例子，public/icon.png 应该在源码中被引用为 /icon.png。 -->
      <!-- public 中的资源不应该被 JavaScript 文件引用。 -->
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
