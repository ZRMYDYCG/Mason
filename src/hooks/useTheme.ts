import { DEFAULT_PRIMARY } from '@/config'
import { useSettingStore } from '@/store/modules/setting.ts'
import { getDarkColor, getLightColor } from '@/utils/color'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { SystemThemeEnum } from '@/config'

export const useTheme = () => {
  const settingStore = useSettingStore()
  const { isDark, systemThemeColor, systemThemeMode, colorWeak, customRadius } =
    storeToRefs(settingStore)

  const root = () => document.documentElement as HTMLElement

  const applyRootClass = (className: string, enabled: boolean) => {
    root().classList.toggle(className, enabled)
  }

  const resolveAutoThemeType = () => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    return mq?.matches ? SystemThemeEnum.DARK : SystemThemeEnum.LIGHT
  }

  const applyThemeMode = () => {
    const resolvedType =
      systemThemeMode.value === SystemThemeEnum.AUTO
        ? resolveAutoThemeType()
        : systemThemeMode.value

    if (settingStore.systemThemeType !== resolvedType) settingStore.setThemeType(resolvedType)
    applyRootClass('dark', resolvedType === SystemThemeEnum.DARK)
  }

  const applyColorWeak = () => {
    applyRootClass('color-weak', !!colorWeak.value)
  }

  const applyCustomRadius = () => {
    const radius = customRadius.value || '0.75'
    root().style.setProperty('--custom-radius', `${radius}rem`)
  }

  const hexToRgbNums = (hex: string): [number, number, number] | null => {
    const normalized = hex.trim().toLowerCase()
    const match = normalized.match(/^#?([0-9a-f]{6})$/)
    if (!match) return null
    const value = match[1]
    const r = parseInt(value.slice(0, 2), 16)
    const g = parseInt(value.slice(2, 4), 16)
    const b = parseInt(value.slice(4, 6), 16)
    return [r, g, b]
  }

  // 切换暗黑模式 ==> 同时修改主题颜色、侧边栏、头部颜色
  const switchDark = () => {
    applyThemeMode()
    changePrimary(systemThemeColor.value)
    applyColorWeak()
    applyCustomRadius()
  }

  // 修改主题颜色
  const changePrimary = (val: string | null) => {
    if (!val) {
      val = DEFAULT_PRIMARY
    }
    root().style.setProperty('--el-color-primary', val)
    const rgb = hexToRgbNums(val)
    if (rgb) root().style.setProperty('--el-color-primary-rgb', `${rgb[0]},${rgb[1]},${rgb[2]}`)

    root().style.setProperty(
      '--el-color-primary-dark-2',
      isDark.value ? `${getLightColor(val, 0.2)}` : `${getDarkColor(val, 0.3)}`
    )
    for (let i = 1; i <= 9; i++) {
      const primaryColor = isDark.value
        ? `${getDarkColor(val, i / 10)}`
        : `${getLightColor(val, i / 10)}`
      root().style.setProperty(`--el-color-primary-light-${i}`, primaryColor)
    }
  }

  const initTheme = () => {
    const sync = () => {
      applyThemeMode()
      applyColorWeak()
      applyCustomRadius()
      changePrimary(systemThemeColor.value)
    }

    watch([systemThemeMode, systemThemeColor, colorWeak, customRadius], sync, { immediate: true })

    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    mq?.addEventListener?.('change', () => {
      if (systemThemeMode.value === SystemThemeEnum.AUTO) sync()
    })
  }

  return {
    switchDark,
    changePrimary,
    initTheme
  }
}
