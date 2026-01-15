import { createI18n } from 'vue-i18n'

import zh from './zh'
import en from './en'

export type AppLocale = 'zh' | 'en'

const normalizeLocale = (value: unknown): AppLocale => {
  return value === 'en' ? 'en' : 'zh'
}

const getInitialLocale = (): AppLocale => {
  const raw = localStorage.getItem('setting')
  if (raw) {
    try {
      const setting = JSON.parse(raw) as { currentLanguage?: unknown }
      return normalizeLocale(setting?.currentLanguage)
    } catch {
      return 'zh'
    }
  }
  return 'zh'
}

const i18n = createI18n({
  allowComposition: true,
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'zh',
  messages: {
    zh,
    en
  }
})

export const setI18nLocale = (locale: AppLocale) => {
  i18n.global.locale.value = locale
  document.documentElement.lang = locale
}

export default i18n
