import { SystemThemeEnum } from '@/config'
import { useSettingStore } from '@/store/modules/setting.ts'
import { computed, nextTick } from 'vue'

/**
 * 主题切换动画
 * @param e 鼠标点击事件
 */
export const themeAnimation = (e: any) => {
  const settingStore = useSettingStore()
  const isDark = computed(() => settingStore.isDark)
  const targetTheme = isDark.value ? SystemThemeEnum.LIGHT : SystemThemeEnum.DARK

  const x = e.clientX
  const y = e.clientY
  // 计算鼠标点击位置距离视窗的最大圆半径
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  // 设置CSS变量
  document.documentElement.style.setProperty('--x', x + 'px')
  document.documentElement.style.setProperty('--y', y + 'px')
  document.documentElement.style.setProperty('--r', endRadius + 'px')
  document.documentElement.style.setProperty('--vt-bg-old', isDark.value ? '#000' : '#fff')
  document.documentElement.style.setProperty('--vt-bg-new', isDark.value ? '#fff' : '#000')

  if (document.startViewTransition) {
    const transition = document.startViewTransition(async () => {
      settingStore.setThemeMode(targetTheme)
      await nextTick()
    })
    transition.finished.finally(() => {
      document.documentElement.style.removeProperty('--vt-bg-old')
      document.documentElement.style.removeProperty('--vt-bg-new')
      document.documentElement.style.removeProperty('--x')
      document.documentElement.style.removeProperty('--y')
      document.documentElement.style.removeProperty('--r')
    })
  } else {
    settingStore.setThemeMode(targetTheme)
    document.documentElement.style.removeProperty('--vt-bg-old')
    document.documentElement.style.removeProperty('--vt-bg-new')
    document.documentElement.style.removeProperty('--x')
    document.documentElement.style.removeProperty('--y')
    document.documentElement.style.removeProperty('--r')
  }
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
