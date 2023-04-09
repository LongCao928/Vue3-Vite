
import axios from 'axios'
import qs from 'qs'

// const baseURL = import.meta.env.VUE_APP_URL
// const envType = import.meta.env.VUE_APP_ENV

// `withCredentials` 表示跨域请求时是否需要使用凭证
// axios.defaults.withCredentials = true
// console.log(`${envType}：${baseURL}`)

function makeUrl(host, path, query) {
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
        return axios.get(makeUrl('https://baidu.com', path, data), config ? config : {})
    },
    async post(path, data, config) {
        // return axios.post('https://baidu.com' + path, data)
        return axios.post(makeUrl('https://baidu.com', path, null), data, config ? config : {})
    }
}