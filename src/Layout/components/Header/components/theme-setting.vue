<template>
  <iconpark-icon
    @click="openDrawer"
    class="cursor-pointer w-[40px] h-[40px]"
    name="page-config"
  ></iconpark-icon>
</template>

<script setup lang="ts">
import mittBus from '@/utils/mittBus.ts'
const openDrawer = () => {
  mittBus.emit('openThemeDrawer')
}
</script>

<style lang="scss" scoped>
.icon:hover {
  color: var(--el-color-primary);
}
</style>
