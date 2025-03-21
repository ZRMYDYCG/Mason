/**
 * 全局默认配置项
 * */

// 首页地址（默认）
export const HOME_URL: string = '/dashboard'

// 登录页地址（默认）
export const LOGIN_URL: string = '/login'

// 默认主题颜色
export const DEFAULT_PRIMARY: string = '#2254F4'

// Element plus theme
export const ElementPlusTheme = {
  primary: '#5D87FF'
}

// 用户信息
export interface UserInfo {
  id: number
  name: string
  username: string
  avatar: string
  email: string
}

// 系统主题样式（light | dark）
export interface SystemThemeType {
  className: string // className
}

// 定义包含多个主题的类型
export type SystemThemeTypes = {
  [key in Exclude<SystemThemeEnum, SystemThemeEnum.AUTO>]: SystemThemeType
}

// 菜单主题样式
export interface MenuThemeType {
  theme: MenuThemeEnum // 主题名称
  background: string // 背景色
  systemNameColor: string // 系统标题颜色
  textColor: string // 文字颜色
  textActiveColor: string // 文字选中颜色
  iconColor: string // 图标颜色
  iconActiveColor: string // 图标选中颜色
  tabBarBackground: string // 顶栏背景色
  systemBackground: string // 系统背景色
  leftLineColor: string // 左侧线条颜色
  rightLineColor: string // 右侧线条颜色
}

// 设置中心
export interface Setting {
  theme: string // 主题
  uniqueOpened: boolean // 是否开启手风琴模式
  menuButton: boolean // 是否显示菜单展开按钮
  showRefreshButton: boolean // 是否显示页面刷新按钮
  showCrumbs: boolean // 是否显示全局面包屑
  autoClose: boolean // 设置后是否自动关闭窗口
  showWorkTab: boolean // 是否显示多标签
  showLanguage: boolean // 是否显示多语言选择
  showNprogress: boolean // 是否显示顶部进度条
  themeModel: string // 主题模式
}

// 多标签
export interface WorkTabType {
  title: string
  path: string
  name: string
  keepAlive: boolean
  params?: object
  query?: object
}

export type MenuListType = any

// 系统级别枚举

// 菜单类型
export enum MenuTypeEnum {
  LEFT = 'left',
  TOP = 'top',
  TOP_LEFT = 'top-left',
  DUAL_MENU = 'dual-menu'
}

// App theme enum
export enum SystemThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
  AUTO = 'auto'
}

// Menu theme enum
export enum MenuThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
  DESIGN = 'design'
}

// Menu close width
export enum MenuWidth {
  CLOSE = '70px'
}

// Language
export enum LanguageEnum {
  ZH = 'zh',
  EN = 'en'
}

// Icon type
export enum IconTypeEnum {
  CLASS_NAME = 'className',
  UNICODE = 'unicode'
}

// Container width
export enum ContainerWidthEnum {
  FULL = '100%',
  BOXED = '1200px'
}

// Background color enum
export enum BgColorEnum {
  PRIMARY = 'bg-primary',
  SECONDARY = 'bg-secondary',
  WARNING = 'bg-warning',
  ERROR = 'bg-error',
  SUCCESS = 'bg-success',
  DANGER = 'bg-danger'
}

// 系统信息
export const SystemInfo = {
  // 系统名称
  name: 'Art Design Pro',
  // 登录默认帐号、密码
  login: {
    username: 'admin',
    password: '123456'
  }
}

// 系统主题样式（light | dark）
export const SystemThemeStyles: SystemThemeTypes = {
  [SystemThemeEnum.LIGHT]: {
    className: ''
  },
  [SystemThemeEnum.DARK]: {
    className: SystemThemeEnum.DARK
  }
}

// 设置中心主题列表
export const SettingThemeList = [
  {
    name: '浅色',
    theme: SystemThemeEnum.LIGHT,
    color: ['#fff', '#fff'],
    leftLineColor: '#EDEEF0',
    rightLineColor: '#EDEEF0'
  },
  {
    name: '深色',
    theme: SystemThemeEnum.DARK,
    color: ['#22252A'],
    leftLineColor: '#3F4257',
    rightLineColor: '#3F4257'
  },
  {
    name: '系统',
    theme: SystemThemeEnum.AUTO,
    color: ['#fff', '#22252A'],
    leftLineColor: '#EDEEF0',
    rightLineColor: '#3F4257'
  }
]

// 菜单样式
export const ThemeList: MenuThemeType[] = [
  {
    theme: MenuThemeEnum.DESIGN,
    background: '#FFFFFF',
    systemNameColor: 'var(--art-text-gray-800)',
    iconColor: '#6B6B6B',
    textColor: '#29343D',
    textActiveColor: '#3F8CFF',
    iconActiveColor: '#333333',
    tabBarBackground: '#FAFBFC',
    systemBackground: '#FAFBFC',
    leftLineColor: '#EDEEF0',
    rightLineColor: '#EDEEF0'
  },
  {
    theme: MenuThemeEnum.DARK,
    background: '#191A23',
    systemNameColor: '#BABBBD',
    iconColor: '#BABBBD',
    textColor: '#BABBBD',
    textActiveColor: '#FFFFFF',
    iconActiveColor: '#FFFFFF',
    tabBarBackground: '#FFFFFF',
    systemBackground: '#F8F8F8',
    leftLineColor: '#3F4257',
    rightLineColor: '#EDEEF0'
  },
  {
    theme: MenuThemeEnum.LIGHT,
    background: '#ffffff',
    systemNameColor: '#68758E',
    iconColor: '#6B6B6B',
    textColor: '#29343D',
    textActiveColor: '#3F8CFF',
    iconActiveColor: '#333333',
    tabBarBackground: '#FFFFFF',
    systemBackground: '#F8F8F8',
    leftLineColor: '#EDEEF0',
    rightLineColor: '#EDEEF0'
  }
]

// dark 模式下 菜单样式
export const DarkMenuStyles: MenuThemeType[] = [
  {
    theme: MenuThemeEnum.DARK,
    background: '#161618',
    systemNameColor: '#DDDDDD',
    iconColor: '#BABBBD',
    textColor: 'rgba(#FFFFFF, 0.7)',
    textActiveColor: '',
    iconActiveColor: '#FFFFFF',
    tabBarBackground: '#FFFFFF',
    systemBackground: '#F8F8F8',
    leftLineColor: '#3F4257',
    rightLineColor: '#EDEEF0'
  }
]

// 系统主色
export const SystemMainColor = [
  '#5D87FF',
  '#B48DF3',
  '#1D84FF',
  '#60C041',
  '#38C0FC',
  '#F9901F',
  '#FF80C8'
]

// 系统设置中心配置
export const SystemSetting = {
  defaultMenuWidth: 252, // 菜单展开宽度默认值
  defaultCustomRadius: '0.75' // 圆角默认值
}
