
const ENV = import.meta.env.MODE || process.env.NODE_ENV // development | production

const STAGE = import.meta.env.VITE_STAGE

const isDev = import.meta.env.DEV ? true : false
const isTest = STAGE === 'TEST' && !isDev
const isBeta = STAGE === 'BETA'
const isProd = STAGE === 'PROD'


// export const TOKEN = process.env.VUE_APP_TOKEN

export const UA = window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA)
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isAndroid = UA && UA.indexOf('android') > 0
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

const hostMap = {
    TEST: 'https://rmp-boyu-test.inboyu.com',
    BRTA: 'https://rmp-boyu-beta.inboyu.com',
    PROD: 'https://rmp-boyu.inboyu.com'
}

export const HOST = hostMap[STAGE]
