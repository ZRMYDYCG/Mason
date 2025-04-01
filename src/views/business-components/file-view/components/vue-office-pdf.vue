<script setup lang="ts">
import { ref } from 'vue'
import VueOfficePdf from '@vue-office/pdf'

import PdfFile from '@/assets/office/test.pdf?url'

defineOptions({
  name: 'VueOfficePdf'
})

const loading = ref(true)
const src = ref(PdfFile)

const renderedHandler = () => (loading.value = false)
const errorHandler = () => (loading.value = false)

const handleFileChange = (uploadFile) => {
  const reader = new FileReader()
  reader.onload = (e) => (src.value = e.target?.result)
  reader.readAsArrayBuffer(uploadFile.raw)
}
</script>

<template>
  <div v-loading="loading" class="pdf-container">
    <el-upload accept=".pdf" :limit="1" :auto-upload="false" :on-change="handleFileChange">
      <el-button type="primary">上传PDF文件</el-button>
      <template #tip>
        <div class="el-upload__tip">支持预览 PDF 格式文档</div>
      </template>
    </el-upload>

    <div class="pdf-wrapper">
      <VueOfficePdf :src="src" @rendered="renderedHandler" @error="errorHandler" />
    </div>
  </div>
</template>

<style scoped>
.pdf-container {
  padding: 20px;
  height: 100vh;
}

.pdf-wrapper {
  height: calc(100vh - 160px);
  margin-top: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
}

.el-upload__tip {
  color: #606266;
  font-size: 12px;
  margin-top: 8px;
}
</style>
