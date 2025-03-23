<template>
  <i @click="openDrawer" class="iconfont icon-buju" />
</template>

<script setup lang="ts">
import mittBus from '@/utils/mittBus.ts'
const openDrawer = () => {
  mittBus.emit('openThemeDrawer')
}
</script>

<style lang="scss" scoped></style>
