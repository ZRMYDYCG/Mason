import { createI18n } from 'vue-i18n'

import zh from './zh'
import en from './en'

const i18n = createI18n({
  allowComposition: true,
  legacy: false,
  locale: JSON.parse(localStorage.getItem('setting')!)?.currentLanguage,
  messages: {
    zh,
    en
  }
})

export default i18n
