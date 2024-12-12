<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-11
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-11
 * @Description:
-->
<template>
  <iconpark-icon
    @click="openDrawer"
    class="cursor-pointer fixed top-[500px] right-0 w-[40px] h-[40px] flex justify-center items-center rounded-s-lg shadow-md border border-r-0 border-gray-200 rounded-s-md z-[50] hover:bg-gray-100"
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
