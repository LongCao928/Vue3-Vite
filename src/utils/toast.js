import { ElMessage, ElMessageBox } from 'element-plus'

/**
 * toast 提示
 * @param {String} message
 * @param {MessageParams} option
 */

export const Toast = (message, option = {}) => {
  return ElMessage({
    message,
    showClose: true,
    grouping: true,
    duration: 2000,
    ...option,
  })
}

/**
 * alert提示框
 * @param {String} message
 * @param {ElMessageBoxOptions} config
 */
export const Alert = (message, config = {}) => {
  const defaultOption = {
    title: '温馨提示',
    closeOnClickModal: false,
    closeOnPressEscape: false,
    confirmButtonText: '确认',
    draggable: true,
    customClass: `${config.customClass || ''} p_messagebox`,
  }
  const option = { ...defaultOption, ...config }
  return ElMessageBox.alert(message, option)
}
/**
 * confirm确认框
 * @param {String} message
 * @param {ElMessageBoxOptions} config
 */
export const Confirm = (message, config = {}) => {
  const defaultOption = {
    title: '温馨提示',
    closeOnClickModal: false,
    closeOnPressEscape: false,
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    draggable: true,
    customClass: `${config.customClass || ''} p_messagebox`,
  }
  const option = { ...defaultOption, ...config }
  return ElMessageBox.confirm(message, option)
}
// 自定义prompt
export const Prompt = function prompt(message, title = '提示', opt = {}) {
  opt.customClass = (opt.customClass || '') + ' f-messagebox'
  opt.cancelButtonClass = (opt.cancelButtonClass || '') + ' is-plain'
  if (opt.isDanger) {
    opt.confirmButtonClass =
      (opt.confirmButtonClass || '') + 'el-button--danger'
  }
  return MessageBox.prompt(message, title, opt)
}
