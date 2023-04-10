import { createApp } from "vue"
// import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from "pinia"
import { registerStore } from "@/store"
import ElementPlus from "element-plus"
import zhCn from "element-plus/lib/locale/lang/zh-cn"
import "element-plus/dist/index.css"
import "./style.css"
import App from "./App.vue"

import router from "./router"

// components
// import './components/all'

const pinia = createPinia()

const app = createApp(App)

// const Home = { template: '<div>Home</div>' }
// const About = { template: '<div>About</div>' }

/* const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
] */

/* const router = createRouter({
    history: createWebHistory(),
    routes
}) */

/* router.beforeEach((to, from, next) => {
    console.log(to)
    console.log(from)
    if(true) {
        next()
    } else next('/login')
}) */

app.use(router)

app.use(pinia)
// 注册 pinia 组件库
registerStore()

app.use(ElementPlus, { locale: zhCn })

app.mount("#app")
