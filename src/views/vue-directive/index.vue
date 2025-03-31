<script setup lang="ts"></script>

<template>
  <el-button v-ripple>默认效果</el-button>

  <el-button
    v-ripple="{
      background: '#ff000080',
      transition: 600,
      event: 'click'
    }"
  >
    自定义波纹效果
  </el-button>
</template>

<style scoped lang="scss"></style>
