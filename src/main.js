import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'

const app = createApp(App)

const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

app.use(router)

app.use(ElementPlus, { locale: zhCn })

app.mount('#app')
