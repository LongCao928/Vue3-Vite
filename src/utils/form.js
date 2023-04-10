// 常用按钮组
const btnOK = {
  label: '确定',
  key: 'ok',
}
const btnCancel = {
  label: '取消',
  key: 'cancel',
  type: 'plain',
}

function makeMsg(oriMsg, msg) {
  return `${oriMsg}${msg ? '，' + msg : ''}`
}

// rule
export default {
  OK: [btnOK],
  OK_CANCEL: [btnCancel, btnOK],
  CLOSE: [
    {
      label: '关闭',
      key: 'cancel',
      type: 'plain',
    },
  ],

  // 常用规则
  // 所有规则都可通过配置options.extraMsg来自定义追加一段错误提示
  rules: {
    /**
     * 必填项
     * @param {String} label
     */
    required(label, options = {}) {
      return {
        required: true,
        message: makeMsg(`${label}不能为空`, options.extraMsg),
        trigger: 'blur',
        ...options,
      }
    },

    /**
     * 六位验证码
     */
    vcode(options = {}) {
      return {
        validator: (rule, value, callback) => {
          if (!/^\d{6}$/.test(value)) {
            callback(
              new Error(makeMsg('请输入正确的六位数字验证码', options.extraMsg))
            )
          } else {
            callback()
          }
        },
        trigger: 'blur',
      }
    },

    /**
     * 中国大陆手机号
     */
    mobile(options = {}) {
      return {
        validator: (rule, value, callback) => {
          if (!value) {
            callback()
          } else {
            if (!/^1\d{10}$/.test(value)) {
              callback(
                new Error(makeMsg('请输入正确的手机号码', options.extraMsg))
              )
            } else {
              callback()
            }
          }
        },
        trigger: 'blur',
      }
    },

    /**
     * 系统限制密码规则
     */
    password(options = {}) {
      return {
        validator: (rule, value, callback) => {
          if (value.length < 8 || value.length > 20) {
            callback(
              new Error(makeMsg('密码长度须在8-20之间', options.extraMsg))
            )
          } else if (
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
          ) {
            callback()
          } else {
            callback(
              new Error(
                makeMsg(
                  '密码须包括大小写字母和数字，不能包含特殊字符',
                  options.extraMsg
                )
              )
            )
          }
        },
        trigger: 'blur',
      }
    },

    /**
     * 邮箱
     */
    email(options = {}) {
      return {
        validator: (rule, value, callback) => {
          const emailReg =
            /^[.A-Za-z0-9_-\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if (!value) {
            callback()
          } else {
            if (emailReg.test(value)) {
              callback()
            } else {
              callback(new Error(makeMsg('邮箱格式不正确', options.extraMsg)))
            }
          }
        },
        trigger: 'blur',
      }
    },

    /**
     * 用户名
     */
    username(options = {}) {
      return {
        validator: (rule, value, callback) => {
          const usernameReg = /^[A-Za-z\u4e00-\u9fa5\s]+$/
          if (!value) {
            callback()
          } else {
            if (usernameReg.test(value) && value.trim()) {
              callback()
            } else {
              callback(new Error(makeMsg('仅限汉字或字母', options.extraMsg)))
            }
          }
        },
        trigger: 'blur',
      }
    },
    /**
     * 限制长度
     * @param {Number} min
     * @param {Number} max
     */
    len(min = 0, max = Infinity, options = {}) {
      let message
      if (min === 0) {
        message = `长度不能超过${max}个字符`
      } else if (max === Infinity) {
        message = `长度不能少于${min}个字符`
      } else {
        message = `长度须在${min}到${max}个字符之间`
      }
      return {
        min,
        max,
        message: makeMsg(message, options.extraMsg),
        trigger: 'blur',
      }
    },

    /**
     * 国内电话号码
     */
    tel(options = {}) {
      return {
        validator: (rule, value, callback) => {
          const reg = /^[()\-0-9]{1,15}$/
          if (!value) {
            callback()
          } else {
            if (reg.test(value)) {
              callback()
            } else {
              callback(
                new Error(makeMsg('请输入正确的电话号码', options.extraMsg))
              )
            }
          }
        },
        trigger: 'blur',
      }
    },
    /**
     * 正浮点数限制
     * @param {Number} i 整数最大位数
     * @param {Number} f 小数最大位数
     * @param {Object} options 配置
     *    isMoreThanZero: 是否强制大于0
     *    canNegative: 是否允许输入负数
     */
    float(i, f, options = {}) {
      return {
        validator: (rule, value, callback) => {
          let reg
          let msg
          if (f == 0) {
            reg = new RegExp(`^-?\\d{1,${i}}$`)
          } else {
            reg = new RegExp(`^-?\\d{1,${i}}(\\.\\d{1,${f}})?$`)
          }
          if (!value) {
            callback()
          } else {
            if (reg.test(value)) {
              if (options.isMoreThanZero && Number(value) <= 0) {
                msg = '请输入大于零的数值'
              } else if (!options.canNegative && Number(value) < 0) {
                msg = '不能输入小于零的数值'
              } else {
                callback()
              }
            } else {
              msg = `最多包含${i}位整数`
              if (f != 0) {
                msg += `和${f}位小数`
              }
            }
          }
          if (msg) {
            callback(new Error(makeMsg(msg, options.extraMsg)))
          }
        },
        trigger: 'blur',
      }
    },
    // 验证身份证的合法性
    identityCodeValid(success, failed) {
      let validator = (rule, value, callback, source) => {
        value = value.toUpperCase()
        let city = {
          11: '北京',
          12: '天津',
          13: '河北',
          14: '山西',
          15: '内蒙古',
          21: '辽宁',
          22: '吉林',
          23: '黑龙江 ',
          31: '上海',
          32: '江苏',
          33: '浙江',
          34: '安徽',
          35: '福建',
          36: '江西',
          37: '山东',
          41: '河南',
          42: '湖北 ',
          43: '湖南',
          44: '广东',
          45: '广西',
          46: '海南',
          50: '重庆',
          51: '四川',
          52: '贵州',
          53: '云南',
          54: '西藏 ',
          61: '陕西',
          62: '甘肃',
          63: '青海',
          64: '宁夏',
          65: '新疆',
          71: '台湾',
          81: '香港',
          82: '澳门',
          91: '国外 ',
        }

        if (
          !value ||
          !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
            value
          )
        ) {
          let tip = '身份证号格式错误'
          callback(new Error(tip))
          if (failed) {
            failed()
          }
          return
        }
        if (!city[value.substr(0, 2)]) {
          let tip = '地址编码错误'
          callback(new Error(tip))
          if (failed) {
            failed()
          }
          return
        }
        // 18位身份证需要验证最后一位校验位
        if (value.length === 18) {
          value = value.split('')
          // ∑(ai×Wi)(mod 11)
          // 加权因子
          /* eslint array-element-newline: [2, 'never'] */
          let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
          // 校验位
          let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
          let sum = 0
          let ai = 0
          let wi = 0
          for (let i = 0; i < 17; i++) {
            ai = value[i]
            wi = factor[i]
            sum += ai * wi
          }
          let last = parity[sum % 11]
          if (last != value[17]) {
            let tip = '请输入真实准确的证件号码'
            callback(new Error(tip))
            if (failed) {
              failed()
            }
            return
          }
        }

        callback()
        if (success) {
          success()
        }
      }
      let trigger = 'blur'
      return {
        validator,
        trigger,
      }
    },

    /*
        不允许输入空格
       */
    notBlank(label) {
      return {
        validator: (rule, value = '', callback) => {
          value += ''
          let arr = []
          if (value) {
            arr = value.split(' ')
          }
          if (arr.length > 1) {
            callback(new Error(`${label}不能包含空格`))
          } else {
            callback()
          }
        },
        trigger: 'blur',
      }
    },

    /*
        输入纯数字
       */
    onlyNumber() {
      return {
        validator: (rule, value, callback) => {
          if (value === undefined || value === '') {
            callback()
            return
          }
          if (!/^[0-9]*$/.test(value)) {
            callback(new Error('请输入纯数字'))
          } else {
            callback()
          }
        },
        trigger: 'blur',
      }
    },

    /*
        输入数字或字母
       */
    onlyNumLetter() {
      return {
        validator: (rule, value, callback) => {
          if (value === undefined || value === '') {
            callback()
            return
          }
          if (!/^[0-9a-zA-Z]+$/.test(value)) {
            callback(new Error('请输入数字或字母'))
          } else {
            callback()
          }
        },
        trigger: 'blur',
      }
    },

    /**
     * 仅限汉字或字母
     */
    chineseOrLetter() {
      return {
        validator: (rule, value, callback) => {
          const testReg = /^[A-Za-z\u4e00-\u9fa5]+$/
          if (value) {
            if (testReg.test(value)) {
              callback()
            } else {
              callback(new Error('仅限汉字或字母'))
            }
          } else {
            callback()
          }
        },
        trigger: 'blur',
      }
    },

    /**
     * 不允许标点和数字
     */
    notNumPoint() {
      return {
        validator: (rule, value, callback) => {
          const testReg = /^[A-Za-z\u4e00-\u9fa5()（）]+$/
          if (value) {
            if (testReg.test(value)) {
              callback()
            } else {
              callback(new Error('不允许输入标点或数字'))
            }
          } else {
            callback()
          }
        },
        trigger: 'blur',
      }
    },

    /*
        不允许输入全部是空格
       */
    notAllBlank(label) {
      return {
        validator: (rule, value = '', callback) => {
          if (value.trim().length == 0) {
            callback(new Error(`${label}不能全部是空格`))
          } else {
            callback()
          }
        },
        trigger: 'blur',
      }
    },

    /**
     * 仅限汉字或字母或数字
     */
    chineseOrLetterOrNumber() {
      return {
        validator: (rule, value, callback) => {
          const testReg = /^[0-9a-zA-Z\u4e00-\u9fa5]+$/
          if (value) {
            if (testReg.test(value)) {
              callback()
            } else {
              callback(new Error('仅限汉字、字母或数字'))
            }
          } else {
            callback()
          }
        },
        trigger: 'blur',
      }
    },

    /**
     * 正整数
     */
    positiveInteger(options = {}) {
      return {
        validator: (rule, value, callback) => {
          if (value === undefined || value === '') {
            callback()
          } else if (
            (Number.isInteger(Number(value)) && Number(value) > 0) ||
            !value
          ) {
            callback()
          } else {
            callback(new Error(options.errorMsg || '请输入正整数'))
          }
        },
        trigger: 'blur',
      }
    },
    /**
     * 自然数
     */
    naturalNumber(options = {}) {
      return {
        validator: (rule, value, callback) => {
          if (value === undefined || value === '') {
            callback()
          } else if (Number.isInteger(Number(value)) && Number(value) >= 0) {
            callback()
          } else {
            callback(new Error(options.errorMsg || '请输入自然数'))
          }
        },
        trigger: 'blur',
      }
    },

    /**
     * 最小值
     */
    min(minValue, options = {}) {
      return {
        validator: (rule, value, callback) => {
          if (value === '' || _.isNaN(Number(value))) {
            callback(new Error('请输入数字。' + (options.errorMsg || '')))
          } else if (Number(value) < Number(minValue)) {
            callback(
              new Error(`不能小于${minValue}。` + (options.errorMsg || ''))
            )
          } else if (
            options.canEqual === false &&
            Number(value) == Number(minValue)
          ) {
            callback(
              new Error(
                `不能小于或等于${minValue}。` + (options.errorMsg || '')
              )
            )
          } else {
            callback()
          }
        },
        trigger: 'blur',
      }
    },

    /**
     * 最大值
     */
    max(maxValue, options = {}) {
      return {
        validator: (rule, value, callback) => {
          if (value === '' || _.isNaN(Number(value))) {
            callback(new Error('请输入数字。' + (options.errorMsg || '')))
          } else if (Number(value) > Number(maxValue)) {
            callback(
              new Error(`不能大于${maxValue}。` + (options.errorMsg || ''))
            )
          } else if (
            options.canEqual === false &&
            Number(value) == Number(maxValue)
          ) {
            callback(
              new Error(
                `不能大于或等于${maxValue}。` + (options.errorMsg || '')
              )
            )
          } else {
            callback()
          }
        },
        trigger: 'blur',
      }
    },
  },
}
