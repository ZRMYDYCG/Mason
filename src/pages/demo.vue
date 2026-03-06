<template>
  <!-- Pinia 持久化 -->
  <div>
    <h2>Pinia 测试</h2>
    <h3>计数器: {{ counter }}</h3>
    <button @click="demoStore.increment()">点击+1</button>
  </div>

  <!-- Unocss -->
  <div class="demo">Hello world</div>
  <div class="text-xs text-primary">测试文字</div>
  <div class="text-sm text-success">测试文字</div>
  <div class="text-md text-info">测试文字</div>
  <div class="text-base text-warning">测试文字</div>
  <div class="text-lg text-danger">测试文字</div>
  <div class="text-xl text-text-primary">测试文字</div>
  <div class="text-2xl text-text-regular">测试文字</div>
  <div class="text-3xl text-text-secondary">测试文字</div>

  <button class="mt-xl px-md py-sm border rounded-base" @click="toggleTheme">
    切换深色/浅色模式
  </button>

  <!-- UnocssIcons -->
  <div class="mt-xl flex gap-md">
    <!-- A basic anchor icon from Phosphor icons -->
    <div class="i-ph-anchor-simple-thin" />
    <!-- An orange alarm from Material Design Icons -->
    <i class="i-mdi-alarm text-orange-400" />
    <!-- A large Vue logo -->
    <div class="i-logos-vue text-3xl" />
    <!-- Sun in light mode, Moon in dark mode, from Carbon -->
    <button class="i-carbon-sun dark:i-carbon-moon" />
    <!-- Twemoji of laugh, turns to tear on hovering -->
    <div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
  </div>

  <!-- 本地 SVG -->
  <svg aria-hidden="true" class="svg">
    <use href="#icon-demo" fill="red" />
  </svg>

  <!-- Icon.vue 集成 -->

  <div>
    <icon type="iconify" icon="mdi:user" class="size-8 text-primary" />
    <icon type="uno" icon="i-mdi:user" class="size-8 text-primary" />
    <icon type="svg" icon="demo" class="text-primary size-8!" />
    <icon
      type="iconfont"
      font-url="//at.alicdn.com/t/c/font_3457715_h47rhjpli3n.css"
      icon="mobile-alt"
      class="text-primary text-2xl!"
    />
  </div>

  <!-- 国际化测试 -->
  <h1>国际化路由懒加载测试</h1>
  <div class="text-2xl text-danger">{{ $t('demo.title') }}</div>
  <div>{{ $t('demo.info') }}</div>
</template>

<script setup lang="ts">
import { Env } from '@/utils/env'
import { useDemoStore } from '@/stores/modules/demo'

const demoStore = useDemoStore()
const { counter } = storeToRefs(demoStore)

definePage({
  meta: {
    locales: ['demo'],
  },
})

const toggleTheme = () => {
  const html = document.documentElement
  const currentTheme = html.getAttribute('data-theme')
  html.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark')
}

console.log('VITE_APP_NAME: ', Env.get('VITE_APP_NAME'))
console.log('VITE_NUMBER_DEMO: ', Env.getNumber('VITE_NUMBER_DEMO'))
console.log('VITE_BOOLEAN_DEMO: ', Env.getBoolean('VITE_BOOLEAN_DEMO'))
console.log('isDev', Env.isDev)
console.log('isUat', Env.isUat)
console.log('isProd', Env.isProd)
</script>

<style scoped lang="scss">
.demo {
  @apply text-xl text-primary bg-success-light-7;
}
</style>
