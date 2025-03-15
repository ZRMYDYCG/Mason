<template>
  <div v-if="isLoading" class="loading">
    <Lottie :animation-data="loadingJson" />
  </div>
  <el-config-provider v-if="!isLoading" :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ref } from 'vue'
import { useTheme } from '@/hooks/useTheme'
import Lottie from '@/components/Lottie/index.vue'
import loadingJson from '@/assets/lottie/loading.json'

const { initTheme } = useTheme()
initTheme()

const isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 40)
</script>

<style lang="scss" scoped>
.loading {
  width: 50%;
  height: 100%;
  margin: 0 auto;
}
</style>
