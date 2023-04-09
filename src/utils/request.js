
import axios from 'axios'
import qs from 'qs'

// servers/token/toast/
const baseURL = import.meta.env.VITE_APP_URL
const envType = import.meta.env.VITE_APP_ENV
console.log(import.meta.env.VITE_APP_NANE)

// `withCredentials` 表示跨域请求时是否需要使用凭证
// axios.defaults.withCredentials = true
console.log(`${envType}：${baseURL}`)

// 请求拦截器
axios.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    config.withCredentials = true
    console.log(config)
    return config
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use((response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
})

function makeUrl(path, query) {
    const host = envType === 'development' ? '/api' : baseURL
    query = query || {}
    if(path[0] !== '/') {
        path = `/${path}`
    }
    // query.r = Math.random().toString().replace(/^0\./, '')

    return `${host}${path}?${qs.stringify(query)}`
}

export default {
    async get(path, data, config) {
        // return axios.get('/user?id=123')
        // return axios.get('https://baidu.com' + path, { params: data })
        return axios.get(makeUrl(path, data), config ? config : {})
    },
    async post(path, data, config) {
        // return axios.post('https://baidu.com' + path, data)
        return axios.post(makeUrl(path, null), data, config ? config : {})
    }
}