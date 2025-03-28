import { defineStore } from 'pinia'
import { MenuThemeType } from '@/config'
import piniaPersistConfig from '@/store/helper/persist'
import { ThemeList, ElementPlusTheme, DarkMenuStyles, SystemSetting } from '@/config'
import { SystemThemeEnum, MenuThemeEnum, MenuTypeEnum, ContainerWidthEnum } from '@/config'

const { defaultMenuWidth, defaultCustomRadius } = SystemSetting

export interface SettingState {
  menuType: MenuTypeEnum // 菜单类型
  menuOpenWidth: number // 菜单展开宽度
  systemThemeType: SystemThemeEnum // 全局主题类型 light dark
  systemThemeMode: SystemThemeEnum // 全局主题模式 light dark auto
  menuThemeType: MenuThemeEnum // 菜单主题类型
  systemThemeColor: string // 系统主题颜色
  boxBorderMode: boolean // 盒子模式 border | shadow
  uniqueOpened: boolean // 是否开启手风琴模式
  showMenuButton: boolean // 是否显示菜单展开按钮
  showRefreshButton: boolean // 是否显示页面刷新按钮
  showCrumbs: boolean // 是否显示全局面包屑
  autoClose: boolean // 设置后是否自动关闭窗口
  showWorkTab: boolean // 是否显示多标签
  showLanguage: boolean // 是否显示多语言选择
  showNprogress: boolean // 是否显示顶部进度条
  colorWeak: boolean // 是否开启色弱模式
  showSettingGuide: boolean // 是否显示设置引导
  pageTransition: string // 页面切换动画
  menuOpen: boolean // 菜单是否展开
  refresh: boolean
  isRouterAlive: boolean // 路由是否存活
  watermarkVisible: boolean // 水印是否显示
  customRadius: string // 自定义圆角
  containerWidth: ContainerWidthEnum // 容器宽度
  isFooter: boolean // 是否显示页脚
}

export const useSettingStore = defineStore({
  id: 'setting',
  state: (): SettingState => ({
    menuType: MenuTypeEnum.LEFT,
    menuOpenWidth: defaultMenuWidth,
    systemThemeType: SystemThemeEnum.LIGHT,
    systemThemeMode: SystemThemeEnum.LIGHT,
    menuThemeType: MenuThemeEnum.DESIGN,
    boxBorderMode: true,
    uniqueOpened: true,
    systemThemeColor: ElementPlusTheme.primary,
    showMenuButton: true,
    showRefreshButton: true,
    showCrumbs: true,
    autoClose: false,
    showWorkTab: true,
    showLanguage: true,
    showNprogress: true,
    colorWeak: false,
    showSettingGuide: true,
    pageTransition: 'fade',
    menuOpen: true,
    refresh: false,
    isRouterAlive: true,
    watermarkVisible: true,
    customRadius: defaultCustomRadius,
    containerWidth: ContainerWidthEnum.FULL,
    isFooter: true
  }),
  getters: {
    getMenuTheme(): MenuThemeType {
      const list = ThemeList.filter((item) => item.theme === this.menuThemeType)
      if (this.isDark) {
        return DarkMenuStyles[0]
      } else {
        return list[0]
      }
    },
    // 是否为暗黑模式
    isDark(): boolean {
      return this.systemThemeType === SystemThemeEnum.DARK
    },
    // 获取菜单展开宽度
    getMenuOpenWidth(): string {
      return this.menuOpenWidth + 'px' || defaultMenuWidth + 'px'
    },
    // 获取自定义圆角
    getCustomRadius(): string {
      return this.customRadius + 'rem' || defaultCustomRadius + 'rem'
    }
  },
  actions: {
    setMenuType(type: MenuTypeEnum) {
      this.menuType = type
    },
    setGlopTheme(theme: SystemThemeEnum, themeMode: SystemThemeEnum) {
      this.systemThemeType = theme
      this.systemThemeMode = themeMode
    },
    setMenuTheme(theme: MenuThemeEnum) {
      this.menuThemeType = theme
    },
    setElementTheme(theme: string) {
      this.systemThemeColor = theme
    },
    // 设置容器宽度
    setContainerWidth(width: ContainerWidthEnum) {
      this.containerWidth = width
    },
    // 设置菜单是否展开
    setMenuOpen(open: boolean) {
      this.menuOpen = open
    }
  },
  persist: piniaPersistConfig('setting')
})
