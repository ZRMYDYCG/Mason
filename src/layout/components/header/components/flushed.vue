<script setup lang="ts">
import { useSettingStore } from '@/store/modules/setting.ts'

const settingStore = useSettingStore()

const handleRefresh = () => {
  settingStore.refresh = true // 展示数据加载状态
  settingStore.isRouterAlive = false // 设置为false，卸载dom
  setTimeout(() => {
    // 此处采用了定时器，不采用 nextTick
    settingStore.isRouterAlive = true // 设置为true，重新挂载dom
    settingStore.refresh = false // 隐藏数据加载状态
  }, 500)
}
</script>

<template>
  <AppIcon name="refresh-cw" @click="handleRefresh" />
</template>

<style scoped></style>
