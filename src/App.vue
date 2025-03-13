<template>
  <el-config-provider :locale="zhCn">
    <div v-if="isLoading" class="loading">
      <Lottie :animation-data="loadingJson" />
    </div>
    <router-view v-if="!isLoading" />
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
}, 2000)
</script>

<style lang="scss" scoped>
.loading {
  width: 50%;
  height: 50%;
  margin: 200px auto;
}
</style>
