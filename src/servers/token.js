
const tokenKey = `token_${import.meta.env.VITE_STAGE}`
console.log(tokenKey)

// 移除token
export function clearToken() {
    sessionStorage.clear(tokenKey)
}

// 获取token

export function getToken() {
    return sessionStorage.getItem(tokenKey) || ''
}

// 设置token

export function setToken(token) {
    if(!token || typeof token !== 'string') {
        throw new Error('token 必须是string!')
    }
    sessionStorage.setItem(tokenKey, token)
}