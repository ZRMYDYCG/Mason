import { Department, Menu } from '@/api/interface/system'

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export function getFlatMenuList(menuList: Menu[]): Menu[] {
  let newMenuList: Menu[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.flatMap((item) => [
    item,
    ...(item.children ? getFlatMenuList(item.children) : [])
  ])
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isEnable == false 的菜单)
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 * */
export function getShowMenuList(menuList: Menu[]) {
  let newMenuList: Menu[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.filter((item) => {
    item.children?.length && (item.children = getShowMenuList(item.children))
    return item.meta.isEnable
  })
}

/**
 * @description 使用递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 菜单列表
 * @param {Array} parent 父级菜单
 * @param {Object} result 处理后的结果
 * @returns {Object}
 */
export function getAllBreadcrumbList(
  menuList: Menu[],
  parent = [],
  result: { [key: string]: any } = {}
) {
  for (const item of menuList) {
    result[item.path] = [...parent, item] // 本路径：父级对象+自己  父级递归
    if (item.children) getAllBreadcrumbList(item.children, result[item.path], result)
  }
  return result
}

export interface MenuOption {
  label: string
  value: number
  children: MenuOption[]
}

export function getTreeMenuOptions(menuList: Menu[]): MenuOption[] {
  return menuList.map((item) => {
    return {
      label: item.meta.title,
      value: item.id,
      children: item.children ? getTreeMenuOptions(item.children) : []
    }
  })
}

export interface MenuTree {
  id: number
  label: string
  children?: MenuTree[]
}

export function getTreeMenu(menuList: Menu[]): MenuTree[] {
  return menuList.map((item) => {
    const treeItem: MenuTree = {
      id: item.id,
      label: item.meta.title
    }

    if (item.children && item.children.length > 0) {
      treeItem.children = getTreeMenu(item.children)
    }

    return treeItem
  })
}

export function findNodeById(tree: Department[], id: number): Department | undefined {
  for (const node of tree) {
    if (node.id === id) {
      return node
    }
    if (node.children && node.children.length > 0) {
      const foundNode = findNodeById(node.children, id)
      if (foundNode) {
        return foundNode
      }
    }
  }
  return undefined
}

/**
 * @description 获取需要展开的 subMenu
 * @param {String} path 当前访问地址
 * @returns {Array}
 */
export function getOpenKeys(path: string) {
  let newStr: string = ''
  let newArr: any[] = []
  let arr = path.split('/').map((i) => '/' + i)
  for (let i = 1; i < arr.length - 1; i++) {
    newStr += arr[i]
    newArr.push(newStr)
  }
  return newArr
}

/**
 * @description 判断是否为整数
 * @param {any} val
 * @returns {Boolean}
 */
export function isInteger(val: any) {
  return typeof val === 'number' && val % 1 === 0
}

/**
 * @param {number} size 随机获取几张图片数组，默认获取随机一张图片
 * @description: 获取 /assets/img 路径下随机图片
 */
import { sampleSize } from 'lodash-es'
export const getRandomImg = (size = 1, type: 'viewer' | 'waterfall' = 'viewer') => {
  if (!isInteger(size) || size < 1) {
    return console.warn('参数必须是一个正整数!')
  }
  // 匹配该目录下所有的图片
  const images: string[] = []

  // 使用 Vite 的 import.meta.glob 获取本地图片
  const viewerModules = import.meta.glob('../assets/images/viewer/*.{jpg,png}', { eager: true })
  const waterfallModules = import.meta.glob('../assets/images/waterfall/*.{jpg,png}', {
    eager: true
  })

  const modules = type === 'waterfall' ? waterfallModules : viewerModules

  for (const path in modules) {
    const mod = modules[path] as { default: string }
    images.push(mod.default)
  }

  // 获取图片集合
  const result = sampleSize(images, size)
  return result.length === 1 ? result[0] : result
}

/*
 * @description 手机号码将 xxxxxxxxxx 格式化为 xxx****xxx
 * @param phoneNumber - 需要格式化的手机号码
 * @returns 格式化后的手机号码
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // 确保手机号码长度为10位
  if (phoneNumber.length !== 11) {
    throw new Error('手机号码必须为11位')
  }

  return phoneNumber.replace(/(.{3})(.*)(.{3})/, '$1****$3')
}

export const beautifierConf = {
  html: {
    indent_size: 2,
    indent_char: ' ',
    indent_with_tabs: false,
    editorconfig: false,
    eol: '\n',
    end_with_newline: false,
    indent_level: 0,
    preserve_newlines: true,
    max_preserve_newlines: 10,
    space_in_paren: false,
    space_in_empty_paren: false,
    jslint_happy: false,
    space_after_anon_function: false,
    space_after_named_function: false,
    brace_style: 'collapse',
    unindent_chained_methods: false,
    break_chained_methods: false,
    keep_array_indentation: false,
    unescape_strings: false,
    wrap_line_length: 0,
    e4x: false,
    comma_first: false,
    operator_position: 'before-newline',
    indent_empty_lines: false,
    templating: ['auto']
  },
  js: {
    indent_size: 2,
    indent_char: ' ',
    indent_with_tabs: false,
    editorconfig: false,
    eol: '\n',
    end_with_newline: false,
    indent_level: 0,
    preserve_newlines: true,
    max_preserve_newlines: 10,
    space_in_paren: false,
    space_in_empty_paren: false,
    jslint_happy: false,
    space_after_anon_function: false,
    space_after_named_function: false,
    brace_style: 'collapse',
    unindent_chained_methods: false,
    break_chained_methods: false,
    keep_array_indentation: false,
    unescape_strings: false,
    wrap_line_length: 0,
    e4x: false,
    comma_first: false,
    operator_position: 'before-newline',
    indent_empty_lines: false,
    templating: ['auto']
  },
  css: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  }
}
