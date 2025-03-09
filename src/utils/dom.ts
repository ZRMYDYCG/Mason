import type { CssStyleObject } from '@/typings/index'

/**
 * 检查元素是否包含特定的类名
 * @param el - 要检查的元素
 * @param className - 要检查的类名
 * @returns 如果元素包含该类名则返回 true， 否则返回 false
 */
export function hasClass(el: HTMLElement, className: string) {
  const reg = new RegExp(`(^|\\s)${className}(\\s|$)`)
  return reg.test(el.className)
}

/**
 * 为元素添加特定的类名。如果元素已经包含该类名，则不做任何操作
 * @param el - 要添加类名的元素
 * @param className - 要添加的类名
 */
export function addClass(el: HTMLElement, className: string) {
  if (hasClass(el, className)) return

  const newClass = el.className.split(/\s+/)
  newClass.push(className)
  el.className = newClass.join(' ')
}

/**
 * 移除元素的特定类名。如果元素不包含该类名，则不做任何操作
 * @param el - 要移除类名的元素
 * @param className - 要移除的类名
 */
export function removeClass(el: HTMLElement, className: string) {
  if (hasClass(el, className)) {
    const newClass = el.className.split(/\s+/).filter((name) => name !== className)
    el.className = newClass.join(' ')
  }
}

const elementStyle = document.createElement('div').style as CssStyleObject

const vendor = (() => {
  const transformNames: Record<string, string> = {
    standard: 'transform',
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform'
  }

  for (const key in transformNames) {
    const val = transformNames[key]
    if (elementStyle[val] !== undefined) return key
  }

  return false
})()

/**
 * 为样式添加浏览器前缀
 * @param style - 要添加前缀的样式名
 * @returns 如果支持该样式返回带前缀的样式名，否则返回 false
 */
export function prefixStyle(style: string) {
  if (vendor === false) return false

  if (vendor === 'standard') return style

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
