/**
 * lint-staged 配置文件
 * 仅对暂存的文件执行代码检查和格式化
 */

export default {
  // TypeScript 和 JavaScript 文件
  '*.{js,ts}': ['eslint --fix --cache', 'prettier --write'],

  // Vue 文件
  '*.vue': ['eslint --fix --cache', 'prettier --write'],

  // 样式文件
  '*.{css,scss}': ['prettier --write'],

  // JSON 文件
  '*.json': ['prettier --write'],
}
