<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useTheme } from '@/hooks/useTheme'
const { initTheme } = useTheme()
initTheme()
</script>

<style lang="scss"></style>
