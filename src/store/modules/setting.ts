import { defineStore } from 'pinia'
import { MenuThemeType } from '@/config'
import { ThemeList, ElementPlusTheme, DarkMenuStyles, SystemSetting } from '@/config'
import { SystemThemeEnum, MenuThemeEnum, MenuTypeEnum, ContainerWidthEnum } from '@/config'
import { getSysStorage } from '@/utils/storage'

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
  colorWeak: boolean // 是否显示顶部进度条
  showSettingGuide: boolean // 是否显示设置引导
  pageTransition: string // 页面切换动画
  menuOpen: boolean // 菜单是否展开
  refresh: boolean
  watermarkVisible: boolean // 水印是否显示
  customRadius: string // 自定义圆角
  containerWidth: ContainerWidthEnum // 容器宽度
}

export const useSettingStore = defineStore({
  id: 'settingStore',
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
    pageTransition: 'slide-right',
    menuOpen: true,
    refresh: false,
    watermarkVisible: false,
    customRadius: defaultCustomRadius,
    containerWidth: ContainerWidthEnum.FULL
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
    // 初始化state
    initState() {
      let sys = getSysStorage()

      if (sys) {
        sys = JSON.parse(sys)
        const { setting } = sys.user
        this.menuType = setting.menuType || MenuTypeEnum.LEFT
        this.menuOpenWidth = Number(setting.menuOpenWidth) || defaultMenuWidth
        this.systemThemeType = setting.systemThemeType || SystemThemeEnum.LIGHT
        this.systemThemeMode = setting.systemThemeMode || SystemThemeEnum.LIGHT
        this.menuThemeType = setting.menuThemeType || MenuThemeEnum.DESIGN
        this.containerWidth = setting.containerWidth || ContainerWidthEnum.FULL
        this.systemThemeColor = setting.systemThemeColor || ElementPlusTheme.primary
        this.boxBorderMode = setting.boxBorderMode
        this.uniqueOpened = setting.uniqueOpened
        this.showMenuButton = setting.showMenuButton
        this.showRefreshButton = setting.showRefreshButton
        this.showCrumbs = setting.showCrumbs
        this.autoClose = setting.autoClose
        this.showWorkTab = setting.showWorkTab
        this.showLanguage = setting.showLanguage
        this.showNprogress = setting.showNprogress
        this.colorWeak = setting.colorWeak
        this.showSettingGuide = setting.showSettingGuide
        this.pageTransition = setting.pageTransition
        this.menuOpen = setting.menuOpen
        this.watermarkVisible = setting.watermarkVisible
        this.customRadius = setting.customRadius || defaultCustomRadius
        this.setCustomRadius(this.customRadius)
      } else {
        this.setCustomRadius(this.customRadius)
      }
    },
    setMenuType(type: MenuTypeEnum) {
      this.menuType = type
    },
    setMenuOpenWidth(width: number) {
      this.menuOpenWidth = width
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
    // 设置盒子模式
    setBorderMode() {
      this.boxBorderMode = !this.boxBorderMode
    },
    // 设置容器宽度
    setContainerWidth(width: ContainerWidthEnum) {
      this.containerWidth = width
    },
    // 设置菜单是否为手风琴模式
    setUniqueOpened() {
      this.uniqueOpened = !this.uniqueOpened
    },
    // 显示侧边栏折叠按钮
    setButton() {
      this.showMenuButton = !this.showMenuButton
    },
    // 是否自动关闭个性化设置
    setAutoClose() {
      this.autoClose = !this.autoClose
    },
    // 是否显示页面刷新按钮
    setShowRefreshButton() {
      this.showRefreshButton = !this.showRefreshButton
    },
    // 是否显示面包屑导航
    setCrumbs() {
      this.showCrumbs = !this.showCrumbs
    },
    // 是否显示多标签
    setWorkTab(show: boolean) {
      this.showWorkTab = show
    },
    // 是否显示多语言选择
    setLanguage() {
      this.showLanguage = !this.showLanguage
    },
    // 是否显示顶部进度条
    setNprogress() {
      this.showNprogress = !this.showNprogress
    },
    //  色弱模式
    setColorWeak() {
      this.colorWeak = !this.colorWeak
    },
    // 隐藏设置引导
    hideSettingGuide() {
      this.showSettingGuide = false
    },
    // 显示设置引导
    openSettingGuide() {
      this.showSettingGuide = true
    },
    // 设置页面切换动画
    setPageTransition(transition: string) {
      this.pageTransition = transition
    },
    // 设置菜单是否展开
    setMenuOpen(open: boolean) {
      this.menuOpen = open
    },
    // 刷新当前页
    reload() {
      this.refresh = !this.refresh
    },
    // 设置水印是否显示
    setWatermarkVisible(visible: boolean) {
      this.watermarkVisible = visible
    },
    // 设置自定义圆角
    setCustomRadius(radius: string) {
      this.customRadius = radius
      document.documentElement.style.setProperty('--custom-radius', `${radius}rem`)
    }
  }
})
