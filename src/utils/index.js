/**
 * Util Functions
 */

import _ from 'lodash'
import Loading from './loading'
import Tip from './tip'
import Config from '@/config'
import router from '@/router'

/**
 * 获取错误码对应的错误信息
 * @param {String} errcode
 */
function getErrmsg(resp) {
  let msg = Config.errmsg[resp.errcode] || resp.errmsg || Config.errmsg.DEFAULT
  return msg.replace(/\n/g, '<br>')
}

/**
 * 生成一个标准的错误对象，提供给Promise的reject函数
 * @param {Object} resp
 */
function makeError(resp) {
  let e = new Error(getErrmsg(resp))
  e.resp = resp
  e.errcode = resp.errcode
  return e
}

export default {
  /**
   * Sleep Timeout
   * @author Farseer
   * @date   2018-07-03
   * @param  {Number}   ms Sleep timeout
   * @return {Promise}      SetTimeout promise
   */
  sleep(ms = 500) {
    if (typeof ms !== 'number') {
      throw new Error('param must be a number')
    }
    return new Promise((res) => {
      setTimeout(res, ms)
    })
  },

  /**
   * 获取token租户参数
   * @returns {String | Undefined} token
   */
  getToken() {
    return process.env.VUE_APP_TOKEN || Config.defaultToken
  },

  getErrmsg,
  makeError,

  /**
   * 使用请求生成一个标准的服务
   * @param {Promise} request
   */
  makeService(request, options = {}) {
    return new Promise(async function (res, rej) {
      try {
        let resp = await request
        if (resp.errcode != 0) {
          Loading.hide()
          // 无权访问
          if (resp.errcode == Config.errcode.ACCESS_DENY) {
            const type = options.notAuthJumpType || 'replace'
            router[type]({
              name: 'AccessDeny',
            })
          } else {
            let e = makeError(resp)
            if (!options.noTip) {
              Tip.error(e.message)
            }
            rej(e)
          }
        } else {
          res(resp)
        }
      } catch (e) {
        rej(e)
      }
    })
  },

  /**
   * 下载接口返回的文件
   */
  async downloadService(request, extra, defaultFileName = 'result.xlsx') {
    try {
      let resp = await request
      let match =
        extra &&
        extra.resp &&
        (extra.resp.headers['content-disposition'] || '').match(
          /filename[^;=\n]*=["']?([^"';]*)["';]?/
        )
      let fileName =
        (match && match.length >= 2 && decodeURIComponent(match[1])) ||
        defaultFileName
      const url = window.URL.createObjectURL(new Blob([resp]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
    } catch (e) {
      Tip.error(e.message || e)
    }
  },

  /**
   * 遍历一棵树，对所有结点做处理，子节点属性为children
   * @param {Object} tree
   * @param {Function} fn
   */
  travTree(tree, fn = function () {}, childrenName = 'children') {
    function trav(node, parent) {
      fn(node, parent)
      if (node[childrenName] && node[childrenName].length > 0) {
        for (let item of node[childrenName]) {
          trav(item, node)
        }
      }
    }
    if (_.isArray(tree)) {
      for (let item of tree) {
        trav(item, null)
      }
    } else {
      trav(tree, null)
    }
  },

  /**
   * 去除首尾空格或内部全部空格
   * @param {String} string
   * @param {Boolean} isRemoveAllSpace
   */
  trim(string, isRemoveAllSpace = false) {
    let reg = /(^\s*)|(\s*$)/g
    if (isRemoveAllSpace) {
      reg = /\s/g
    }
    return string.replace(reg, '')
  },

  /**
   * 滚动到第一个错误点
   */
  scrollToFirstError(queryList = [], top = 50) {
    let $errors = [...$('.el-form').find('.is-error')]
    for (let item of queryList) {
      $errors = [...$errors, ...$(item)]
    }
    if ($errors.length > 0) {
      let min = Infinity
      $errors.forEach(function (o) {
        if (min > $(o).offset().top) {
          min = $(o).offset().top
        }
      })
      $('html, body').animate({
        scrollTop: min - top,
      })
      return true
    }
    return false
  },

  /**
   * 滚动到页面指定位置
   * @param {Number} pos
   * @param {Boolean} isForceScrollUp 是否强制约定只往上回滚
   */
  scrollTo(pos, isForceScrollUp = false) {
    if (isForceScrollUp && window.scrollY < pos) return
    $('html, body').animate({
      scrollTop: pos,
    })
  },

  /**
   * 滚动到指定元素
   * @param {Object} element 要滚动到的Dom元素
   * @param {Number} top 头部保留的距离
   * @param {Object} parentElement 调整滚动条的对象
   */
  scrollToElement(element, top = 50, parentElement = null) {
    let $ele = $(element)
    if ($ele.length == 0) return
    let relative = true
    if (parentElement === null) {
      parentElement = $('html, body')
      relative = false
    }
    let winHeight = parentElement[0].clientHeight
    let eleHeight = $ele.outerHeight()
    let currentScrollTop = parentElement.scrollTop()
    // eslint-disable-next-line max-len
    let offsetTop = relative
      ? $ele.offset().top - parentElement.offset().top + currentScrollTop
      : $ele.offset().top
    let topLimit = offsetTop - top
    if (topLimit < 0) topLimit = 0
    let bottomLimit = offsetTop + eleHeight + top - winHeight
    if (bottomLimit < 0) bottomLimit = 0
    let target
    if (currentScrollTop > topLimit) {
      target = topLimit
    } else if (currentScrollTop < bottomLimit) {
      target = bottomLimit
    }
    if (target) {
      parentElement.animate({
        scrollTop: target,
      })
    }
  },

  /**
   * 让用户聚焦于某个元素
   * @param {Object} element 要聚焦的Dom元素
   * @param {String} top 头部保留的距离
   * @param {String} type 聚焦的样式类型
   * @param {Object} parentElement 调整滚动条的对象
   */
  focusElement(element, top = 100, type = '', parentElement = null) {
    this.scrollToElement(element, top, parentElement)
    let $ele = $(element)
    $ele.focus()
    $ele.addClass(`focus-ele ${type}`)

    let focusHandler = $ele.data('focus-handler')

    clearTimeout(focusHandler)

    focusHandler = setTimeout(() => {
      $ele.removeClass(`focus-ele ${type}`)
    }, 6400)

    $ele.data('focus-handler', focusHandler)
  },

  /**
   * 为数字字符串加上三位一个的逗号
   * @param {String} str
   */
  addNumberCommas(str) {
    if ([null, undefined, ''].includes(str)) {
      return ''
    }
    str = str.toString()
    let minus = false
    if (/^-/.test(str)) {
      minus = true
      str = str.replace(/^-/, '')
    }
    let [int, float] = str.split('.')
    let result = []
    for (let i = 0; i < int.length; i++) {
      result = [int[int.length - i - 1], ...result]
      if (i % 3 == 2 && i != int.length - 1) {
        result = [',', ...result]
      }
    }
    if (float) {
      return `${minus ? '-' : ''}${result.join('')}.${float}`
    }
    return `${minus ? '-' : ''}${result.join('')}`
  },

  /**
   * 限制输入校验
   * @param {Number} i 位整数
   * @param {Number} f 位小数
   * @param {String} value 待校验的值
   * @param {String} target 待校验的名称
   * @param {Boolean} isMoreThenZero 是否大于0
   */
  float(i, f, value, target, isMoreThenZero = true) {
    let reg
    if (f == 0) {
      reg = new RegExp(`^\\d{1,${i}}$`)
    } else {
      reg = new RegExp(`^\\d{1,${i}}(\\.\\d{1,${f}})?$`)
    }
    if (reg.test(value)) {
      if (Number(value) == 0 && isMoreThenZero) {
        return '请输入大于零的数值'
      }
      return ''
    }
    if (value == '' || value == undefined) {
      return `${target}不能为空`
    }
    let errmsg = `最多包含${i}位整数`
    if (f != 0) {
      errmsg += `和${f}位小数`
    }
    return errmsg
  },

  /**
   * 折叠月份
   * @param {String} str
   */
  makeMonthStr(str) {
    let arr = str.split(',')
    let result = []
    arr.sort((a, b) => {
      return Number(a) - Number(b)
    })
    arr.forEach((current, index) => {
      current = Number(current)
      if (index == 0) {
        result.push([current])
      } else {
        let last = _.last(result)
        if (current - _.last(last) == 1) {
          last.push(current)
        } else {
          result.push([current])
        }
      }
    })
    return result
      .map((item) => {
        if (item.length == 1) {
          return item[0]
        }
        return `${item[0]}-${_.last(item)}`
      })
      .join(',')
  },

  /**
   * 根据属性值查找key
   * @param {Object} obj
   * @param {String} value
   * @param {Function} compare
   */
  findKey(obj, value, compare = (a, b) => a === b) {
    return Object.keys(obj).find((k) => compare(obj[k], value))
  },

  /**
   * 判断证件类型
   * @param { string } type
   */
  handleCardType(type) {
    switch (parseInt(type, 10)) {
      case -1:
        return {
          name: '无',
          type: parseInt(type, 10),
        }
      case 0:
        return {
          name: '大陆身份证',
          type: parseInt(type, 10),
        }
      case 1:
        return {
          name: '港澳台身份证',
          type: parseInt(type, 10),
        }
      case 2:
        return {
          name: '护照',
          type: parseInt(type, 10),
        }
      case 3:
        return {
          name: '军官证',
          type: parseInt(type, 10),
        }
    }
  },

  /**
   * 浮点相加
   * @param {string} num1 数值1
   * @param {string} num2 数值2
   * @param {Number} len 要保留的小数位
   */
  floatAdd(num1, num2, len) {
    let temp = Number(num1) + Number(num2)
    return this.filterFloatZero(temp.toFixed(len), len)
  },

  /**
   * 浮点相减
   * @param {string} num1 数值1
   * @param {string} num2 数值2
   * @param {Number} len 要保留的小数位
   */
  floatSub(num1, num2, len) {
    let temp = Number(num1) - Number(num2)
    return this.filterFloatZero(temp.toFixed(len), len)
  },

  /**
   * 过滤浮点数，隐藏末尾为0的小数位
   * @param {string} num 要过滤的数值
   * @param {Number} len 要保留的小数位
   */
  filterFloatZero(num, len) {
    if (num === undefined || num === null) return
    let tempStr = Number(num).toFixed(len).split('.') // 拆出小数位的数
    if (tempStr.length <= 1) return num
    if (Number(num).toFixed(len) == parseInt(num, 10)) return parseInt(num, 10)
    let temp = len
    let res = Number(num).toFixed(len)
    for (let i = 1; temp > 0; temp--, i++) {
      if (Number(tempStr[1].substr(temp - 1, 1)) === 0) {
        // 末尾为0,则砍去末尾
        res = Number(res).toFixed(tempStr[1].length - i)
      } else {
        break
      }
    }
    return res
  },

  /**
   * 点击复制文本
   * @param {string} text 文本值
   */
  copyByClick(text) {
    try {
      let input = document.createElement('input')
      document.body.appendChild(input)
      input.value = text
      input.select()
      document.execCommand('copy') // 执行浏览器复制命令
      Tip.success('已复制当前点击的文本')
      document.body.removeChild(input)
    } catch (e) {
      console.log(e)
      Tip.warn('复制当前点击文本失败')
    }
  },

  /**
   * 检查对象字段是否为空或者null
   * @param {Array} text 数组 需要检查的字段数组
   * @param {Object} obj 对象 需要检查的对象
   */
  checkParaIsNullOrEmpty(paraArr, obj) {
    // 检测对象某个值是否为空
    return paraArr.every((key) => {
      return ![undefined, null, ''].includes(obj[key])
    })
  },

  /**
   * 复制对象中指定key值
   * @param {Array} text 数组 需要复制的key值数组
   * @param {Object} obj 对象
   * @param {boolean} bool 值为数组是否取第一个值
   */
  copyObjKeys(paraArr, obj, bool = true) {
    const res = {}
    paraArr.map((item) => {
      if (
        Object.prototype.toString.call(obj[item]) == '[object Array]' &&
        obj[item].length > 0 &&
        bool
      ) {
        res[item] = obj[item][0]
      } else {
        res[item] = obj[item]
      }
    })
    return res
  },

  /**
   * 找出两个对象中指定字段相等且值不为空的元素
   * @param {Object} OriginalObj 对象
   * @param {Object} obj 对象
   * @param {Array} fields  字段数组
   */
  compareObj(OriginalObj, obj, fields) {
    const res = []
    fields.map((key) => {
      if (![undefined, null, ''].includes(OriginalObj[key])) {
        if (OriginalObj[key] == obj[key]) {
          res.push(key)
        }
      }
    })
    return res
  },

  isUndef(val) {
    return val === undefined || val === null
  },

  isDef(val) {
    return val !== undefined && val !== null
  },

  /**
   * 加载外部css
   * @param {string} url 需要引用的外部css文件链接
   */
  loadCss(url) {
    let css = document.createElement('link')
    css.href = url
    css.rel = 'stylesheet'
    css.type = 'text/css'
    document.head.appendChild(css)
  },

  // 检查是否是合法的泊寓域名
  isValidSelfUrl(url) {
    return /^http(s?):\/\/(.+\.)?inboyu\.com(\/.*)?$/.test(
      decodeURIComponent(url)
    )
  },

  /**
   * 下载文件
   * @param {string} url 文件地址
   * @param {string} name 文件名称 跨域失效
   */
  downloadFile(url, name) {
    let aaa = document.createElement('a')
    aaa.setAttribute('id', 'download')
    if (name) {
      aaa.setAttribute('download', name)
    }
    aaa.setAttribute('href', url)
    aaa.style.display = 'none'
    document.body.appendChild(aaa)
    aaa.click()
    document.body.removeChild(document.getElementById('download'))
  },
  /**
   * 简单对象深度拷贝
   * @param {object,array} params
   */
  simpleDeepCopy(params) {
    if (
      ['[object Object]', '[object Array]'].includes(
        Object.prototype.toString.call(params)
      )
    ) {
      return JSON.parse(JSON.stringify(params))
    }
    throw new Error('is not object or array')
  },
}
