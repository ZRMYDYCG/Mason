<script setup lang="ts"></script>

<template>
  <el-scrollbar>
    <template v-for="(item, index) in 100">
      <div>{{ item }}</div>
    </template>
  </el-scrollbar>
  <el-backtop
    :right="15"
    :bottom="15"
    target=".layout-main-content>.el-scrollbar>.el-scrollbar__wrap"
  >
    <el-icon><CaretTop /></el-icon>
  </el-backtop>
</template>

<style scoped></style>
