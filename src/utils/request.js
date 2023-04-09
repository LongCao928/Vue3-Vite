
import axios from 'axios'
import qs from 'qs'

// const baseURL = import.meta.env.VUE_APP_URL
// const envType = import.meta.env.VUE_APP_ENV

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
    async get(path, data) {
        // return axios.get('/user?id=123')
        // return axios.get('https://baidu.com' + path, { params: data })
        return axios.get(makeUrl('https://baidu.com', path, data))
    },
    async post(path, data) {
        // return axios.post('https://baidu.com' + path, data)
        return axios.post(makeUrl('https://baidu.com', path, null), data)
    }
}