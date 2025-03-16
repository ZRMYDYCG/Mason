<template>
  <div class="image-cropping">
    <ImgCutter
      style="margin-top: 20px"
      v-model:imgUrl="imageUrl"
      :box-width="540"
      :box-height="300"
      :cut-width="360"
      :cut-height="200"
      :quality="1"
      :tool="true"
      :watermark-text="'My Watermark'"
      watermark-color="#ff0000"
      :show-preview="true"
      :original-graph="false"
      :preview-title="'预览效果'"
      @error="handleError"
      @image-load-complete="handleLoadComplete"
      @image-load-error="handleLoadError"
      custom-name
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ImgCutter from './components/img-cutter.vue'
import lockImg from '@/assets/images/logo.svg'
const imageUrl = ref(lockImg)

const handleError = (error: any) => {
  console.error('裁剪错误:', error)
}

const handleLoadComplete = (result: any) => {
  console.log('图片加载完成:', result)
}

const handleLoadError = (error: any) => {
  console.error('图片加载失败:', error)
}
</script>
