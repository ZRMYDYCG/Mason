import { SystemThemeEnum } from '@/config'
import { useSettingStore } from '@/store/modules/setting.ts'

/**
 * 主题切换
 */
export const themeAnimation = () => {
  const settingStore = useSettingStore()
  const targetTheme = settingStore.isDark ? SystemThemeEnum.LIGHT : SystemThemeEnum.DARK
  settingStore.setThemeMode(targetTheme)
}

/**
 * 提升暗黑主题下页面刷新视觉体验
 * @param addClass 是否添加 class
 */
export const setThemeTransitionClass = (addClass: boolean) => {
  const el = document.getElementsByTagName('body')[0]

  if (addClass) {
    el.setAttribute('class', 'theme-change')
  } else {
    setTimeout(() => {
      el.removeAttribute('class')
    }, 300)
  }
}
