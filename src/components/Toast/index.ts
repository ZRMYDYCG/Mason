/**
 * 单例二次封装element-plus的message、messageBox、notification组件，统一调用方式，并解决弹窗重叠问题
 * */
import type { ElMessageBoxOptions, MessageOptions, NotificationOptions } from 'element-plus'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

type optionType = MessageOptions | Partial<NotificationOptions> | string

interface MessageImplements {
  info(option?: optionType): void
  warning(option?: optionType): void
  success(option?: optionType): void
  error(option?: optionType): void
}

interface MessageBoxImplements {
  info(message: string, option?: ElMessageBoxOptions, title?: string): void
  warning(message: string, option?: ElMessageBoxOptions, title?: string): void
  success(message: string, option?: ElMessageBoxOptions, title?: string): void
  error(message: string, option?: ElMessageBoxOptions, title?: string): void
}

// message
export function useMessage() {
  class Message implements MessageImplements {
    // 普通提示
    info(option: any): void {
      ElMessage.info(option)
    }
    // 警告提示
    warning(option: any): void {
      ElMessage.warning(option)
    }
    // 成功提示
    success(option: any): void {
      ElMessage.success(option)
    }
    // 错误提示
    error(option: any): void {
      ElMessage.error(option)
    }
  }
  return new Message()
}

// messageBox
export function useMessageBox() {
  class MessageBox implements MessageBoxImplements {
    // 普通提示
    info(message: string, option?: ElMessageBoxOptions, title: string = '温馨提示'): void {
      ElMessageBox.alert(message, title, option)
    }
    // 警告提示
    warning(message: string, option?: ElMessageBoxOptions, title: string = '温馨提示'): void {
      option = { ...option, ...{ type: 'warning' } }
      ElMessageBox.alert(message, title, option)
    }
    // 成功提示
    success(message: string, option?: ElMessageBoxOptions, title: string = '温馨提示'): void {
      option = { ...option, ...{ type: 'warning' } }
      ElMessageBox.alert(message, title, option)
    }
    // 错误提示
    error(message: string, option?: ElMessageBoxOptions, title: string = '温馨提示'): void {
      option = { ...option, ...{ type: 'warning' } }
      ElMessageBox.alert(message, title, option)
    }
    // 确认窗体
    confirm(message: string, option?: ElMessageBoxOptions, title: string = '温馨提示') {
      return ElMessageBox.confirm(message, title, option)
    }
    // 提交内容
    prompt(message: string, option?: ElMessageBoxOptions, title: string = '温馨提示') {
      return ElMessageBox.prompt(message, title, option)
    }
  }
  return new MessageBox()
}

export function useNotify() {
  class Notify implements MessageImplements {
    info(message: string, option?: Partial<NotificationOptions>, title: string = '温馨提示'): void {
      let newOption = merge(option, { message, title })
      sleep(100).then(() => {
        ElNotification.info(newOption)
      })
    }
    warning(message: string, option?: NotificationOptions, title: string = '温馨提示'): void {
      let newOption = merge(option, { message, title })
      sleep(100).then(() => {
        ElNotification.warning(newOption)
      })
    }

    success(message: string, option?: NotificationOptions, title: string = '温馨提示'): void {
      let newOption = merge(option, { message, title })
      sleep(100).then(() => {
        ElNotification.success(newOption)
      })
    }

    error(message: string, option?: NotificationOptions, title: string = '温馨提示'): void {
      let newOption = merge(option, { message, title })
      sleep(100).then(() => {
        ElNotification.error(newOption)
      })
    }
  }
  return new Notify()
}

//  处理合并消息，优先级是单个传参的
function merge(target: { [key: string]: any } = {}, source: { [key: string]: any } = {}) {
  for (let key in source) {
    target[key] = source[key] || target[key]
  }
  return target
}

// 延时函数为了解决弹窗重叠问题
function sleep(time: number) {
  return new Promise((resolve) => {
    let timer = setTimeout(() => {
      resolve('')
      clearTimeout(timer)
    }, time)
  })
}
