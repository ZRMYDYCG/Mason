<template>
  <div class="flex items-center justify-center w-full h-full">
    <img src="@/assets/images/403.svg" class="w-1/3 mr-32" alt="403" />
    <div class="flex flex-col">
      <h2 class="text-6xl">404</h2>
      <h4 class="mt-8 mb-5 text-xl">抱歉，您访问的页面不存在~🙅‍♂️🙅‍♀️</h4>
      <el-button type="primary" @click="router.back">返回上一页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped lang="scss">
h2 {
  font-size: 60px;
  color: var(--el-text-color-primary);
}

h4 {
  margin: 30px 0 20px;
  font-size: 19px;
  font-weight: normal;
  color: var(--el-text-color-regular);
}

.el-button {
  width: 100px;
}
</style>
