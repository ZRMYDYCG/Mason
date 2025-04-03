<template>
  <div v-if="isLoading" class="loading">
    <FullLoading />
  </div>
  <el-config-provider v-if="!isLoading" :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useTheme } from '@/hooks/useTheme'
import FullLoading from '@/components/Loading/full-loading.vue'

const { initTheme } = useTheme()
initTheme()

const isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 2000)
</script>

<style lang="scss"></style>
