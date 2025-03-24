import router from '@/router'
import { ElMessage } from 'element-plus'
import { useSettingStore } from '@/store/modules/setting'

/**
 * 初始化本地数据
 * */
export function initState() {
  if (validateStorageData() || isLocalStorageEmpty()) {
    const settingStore = useSettingStore()
    settingStore.initState()
  }
}

/**
 * 获取系统存储数据
 * */
export function getSysStorage() {
  return localStorage.getItem('mason-admin-local-schema') as any
}

/**
 * 验证本地存储数据的类型
 * */
function validate(obj: any, schema: any, path: string = ''): boolean {
  return Object.keys(schema).every((key) => {
    const fullPath = path ? `${path}.${key}` : key
    const expectedType = schema[key]
    const actualType = typeof obj[key]

    if (typeof expectedType === 'object' && !Array.isArray(expectedType)) {
      return validate(obj[key], expectedType, fullPath)
    } else if (actualType !== expectedType) {
      console.error(
        `检测到本地数据异常 path：[/utils/storage.ts] ${fullPath} 数据类型应为 ${expectedType}，实际为 ${actualType}`
      )
      return false
    }
    return true
  })
}

/**
 * 显示错误消息并处理登出逻辑
 * */
async function handleError() {
  ElMessage({
    type: 'error',
    offset: 40,
    duration: 5000,
    message: '系统检测到本地数据异常，请重新登录系统恢复使用！'
  })

  await logOut()
}

async function logOut() {
  setTimeout(() => {
    localStorage.clear()
    router.push('/login')
    initState()
  }, 1000)
}

/**
 * 验证本地存储数据并处理异常
 * */
export function validateStorageData() {
  if (location.href.includes('/login')) return true
  const schema = {
    user: {
      setting: {
        systemThemeType: 'string',
        systemThemeMode: 'string',
        menuThemeType: 'string',
        boxBorderMode: 'boolean',
        uniqueOpened: 'boolean',
        systemThemeColor: 'string',
        showMenuButton: 'boolean',
        showRefreshButton: 'boolean',
        showCrumbs: 'boolean',
        autoClose: 'boolean',
        showWorkTab: 'boolean',
        showLanguage: 'boolean',
        showNprogress: 'boolean',
        colorWeak: 'boolean',
        showSettingGuide: 'boolean',
        refresh: 'boolean'
      }
    }
  }

  try {
    const data = getLocalStorageData()
    // 模拟本地数据类型错误
    // data.user.language = 2024

    if (Object.keys(data).length === 0) {
      logOut()
      return false
    }

    if (!validate(data, schema)) {
      throw new Error('本地存储数据结构异常')
    }

    return true
  } catch {
    handleError()
    return false
  }
}

/**
 * 获取本地存储数据
 * */
function getLocalStorageData() {
  return JSON.parse(localStorage.getItem('user') || '{}')
}

/**
 * 本地存储是否为空
 * */
function isLocalStorageEmpty() {
  return Object.keys(getLocalStorageData()).length === 0
}

/**
 * 将数据保存到 localStorage 中（在即将离开页面(刷新或关闭)时执行）
 * */
export function saveUserData(dataToSave: any) {
  const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
  const eventType = isiOS ? 'pagehide' : 'beforeunload'
  window.addEventListener(eventType, () => {
    localStorage.setItem('user', JSON.stringify(dataToSave))
  })
}
