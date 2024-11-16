<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
-->
<template>
  <div
    class="theme-setting fixed top-[500px] right-0 w-[40px] h-[40px] flex justify-center items-center rounded-s-lg shadow"
  >
    <i class="icon-yifu toolbar-icon icon iconfont" @click="openDrawer"></i>
  </div>
</template>

<script setup lang="ts">
import mittBus from '@/utils/mittBus.ts'
const openDrawer = () => {
  mittBus.emit('openThemeDrawer')
}
</script>

<style lang="scss" scoped>
.toolbar-icon:hover {
  color: var(--el-color-primary);
  cursor: pointer;
}
</style>
