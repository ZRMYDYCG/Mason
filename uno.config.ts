import { defineConfig, presetWind4, transformerDirectives, transformerVariantGroup, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      // 使用了 Tailwind 4 作为预设，可以通过配置 preflights: { reset: true }来开启样式重置，故这里无需安装其他依赖了。
      preflights: { reset: true },
    }),
    presetIcons({
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      }
    })
  ],

  transformers: [
    // 启用 @apply 指令支持
    transformerDirectives(),
    // 启用 `hover:(bg-gray-400 text-white)` 类写法
    transformerVariantGroup(),
  ],

  theme: {
    colors: {
      // 品牌与状态色
      primary: 'var(--color-primary)',
      success: 'var(--color-success)',
      warning: 'var(--color-warning)',
      danger: 'var(--color-danger)',
      info: 'var(--color-info)',
      // 文字色
      'text-primary': 'var(--color-text-primary)',
      'text-regular': 'var(--color-text-regular)',
      'text-secondary': 'var(--color-text-secondary)',
      // 背景色
      'bg-page': 'var(--bg-color-page)',
      'bg-base': 'var(--bg-color-base)',
    },
    spacing: {
      xs: 'var(--spacing-xs)',
      sm: 'var(--spacing-sm)',
      md: 'var(--spacing-md)',
      lg: 'var(--spacing-lg)',
      xl: 'var(--spacing-xl)',
      '2xl': 'var(--spacing-2xl)',
    },
    fontSize: {
      xs: 'var(--font-size-xs)',
      sm: 'var(--font-size-sm)',
      base: 'var(--font-size-base)',
      lg: 'var(--font-size-lg)',
      xl: 'var(--font-size-xl)',
      '2xl': 'var(--font-size-2xl)',
      '3xl': 'var(--font-size-3xl)',
    },
    borderRadius: {
      sm: 'var(--border-radius-sm)',
      base: 'var(--border-radius-base)',
      lg: 'var(--border-radius-lg)',
      full: 'var(--border-radius-full)',
    },
  },

  rules: [
    ...['primary', 'success', 'warning', 'danger', 'info'].flatMap((color) => [
      [`bg-${color}-light-3`, { 'background-color': `var(--color-${color}-light-3)` }],
      [`bg-${color}-light-5`, { 'background-color': `var(--color-${color}-light-5)` }],
      [`bg-${color}-light-7`, { 'background-color': `var(--color-${color}-light-7)` }],
      [`bg-${color}-light-9`, { 'background-color': `var(--color-${color}-light-9)` }],
      [`text-${color}-dark-2`, { color: `var(--color-${color}-dark-2)` }],
    ]),
  ],

  shortcuts: {
    // 布局
    'flex-center': 'flex justify-center items-center',
    'flex-col-center': 'flex flex-col justify-center items-center',
  },
})
