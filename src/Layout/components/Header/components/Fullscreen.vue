<template>
  <iconpark-icon
    class="icon cursor-pointer"
    :name="isFullscreen ? 'off-screen' : 'full-screen'"
    @click="handleFullScreen"
  ></iconpark-icon>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import screenFull from 'screenfull'

const isFullscreen = ref(screenFull.isFullscreen)

onMounted(() => {
  screenFull.on('change', () => {
    isFullscreen.value = screenFull.isFullscreen
  })
})

const handleFullScreen = () => {
  if (!screenFull.isEnabled) ElMessage.warning('当前您的浏览器不支持全屏')
  screenFull.toggle()
}
</script>

<style scoped lang="scss">
.icon:hover {
  color: var(--el-color-primary);
}
</style>
