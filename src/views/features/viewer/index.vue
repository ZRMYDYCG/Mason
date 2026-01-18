<script setup lang="ts">
import 'viewerjs/dist/viewer.css'
import { directive as viewer } from 'v-viewer'
import { getRandomImg } from '@/utils'

const vViewer = viewer({
  debug: true
})
</script>

<template>
  <div>
    <el-card shadow="never">
      <template #extra>
        <el-button
          type="primary"
          tag="a"
          href="https://github.com/mirari/v-viewer"
          target="_blank"
          rel="noopener noreferrer"
        >
          v-viewer
        </el-button>
      </template>
      <div v-viewer class="image-grid">
        <img
          v-for="(img, index) in getRandomImg(20) as string[]"
          :key="index"
          :src="img"
          class="image-item"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;

  .image-item {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
