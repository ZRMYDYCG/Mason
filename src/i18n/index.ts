import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

/**
 * 获取浏览器语言
 */
const getBrowserLanguage = () => {
  const browserLanguage = navigator.language || (navigator as any).userLanguage
  return ['zh-CN', 'en-US'].includes(browserLanguage) ? browserLanguage : 'zh-CN'
}

const currentLang = localStorage.getItem('local') || getBrowserLanguage()

const i18n = createI18n({
  legacy: false,
  local: currentLang,
  fallbackLocale: 'zh-CN',
  messages: {},
})

/**
 * 动态加载语言包
 */
export async function loadLanguage(lang: string) {
  return import(`./locales/${lang}.ts`).then((messgaes) => {
    i18n.global.setLocaleMessage(lang, messgaes.default)
    localStorage.setItem('local', lang)
    return lang
  })
}

loadLanguage(currentLang)

export const installI18n = (app: App) => {
  app.use(i18n)
}

export default i18n
