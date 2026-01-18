<template>
  <div v-if="visible" class="watermark-container" :style="{ zIndex: zIndex }">
    <el-watermark
      :content="content"
      :font="[{ fontSize: fontSize, color: fontColor }]"
      :rotate="rotate"
      :gap="[gapX, gapY]"
      :offset="[offsetX, offsetY]"
    >
      <!-- 使用一个全屏的 div 来覆盖整个视图区域 -->
      <div style="height: 100vh"></div>
    </el-watermark>
  </div>
</template>

<script setup lang="ts">
interface WatermarkProps {
  content?: string // 水印内容
  visible?: boolean // 水印是否可见
  fontSize?: number // 水印字体大小
  fontColor?: string // 水印字体颜色
  rotate?: number // 水印旋转角度
  gapX?: number // 水印水平间距
  gapY?: number // 水印垂直间距
  offsetX?: number // 水印水平偏移量
  offsetY?: number // 水印垂直偏移量
  zIndex?: number // 水印的 z-index 层级
}

withDefaults(defineProps<WatermarkProps>(), {
  content: 'Mason • Admin',
  visible: false,
  fontSize: 16,
  fontColor: 'rgba(128, 128, 128, 0.2)',
  rotate: -22,
  gapX: 100,
  gapY: 100,
  offsetX: 50,
  offsetY: 50,
  zIndex: 3100
})
</script>

<style scoped>
.watermark-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
</style>
