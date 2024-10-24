<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: 
-->
<script setup lang="ts">
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-scrollbar style="width: 100%">
    <el-menu :default-active="1" @open="handleOpen" @close="handleClose">
      <template v-for="item in 20">
        <el-menu-item :index="item">
          <template #title>菜单项 {{ item }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<style scoped>
:deep(.el-menu) {
  border-right: none;
}
</style>
