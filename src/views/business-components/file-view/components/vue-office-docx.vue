<script setup lang="ts">
import '@vue-office/docx/lib/index.css'
import VueOfficeDocx from '@vue-office/docx'
import { ref } from 'vue'

import DocxFile from '@/assets/office/test.docx?url'

defineOptions({
  name: 'VueOfficeDocx'
})

const loading = ref(true)
const src = ref(DocxFile)

// 渲染完成
const renderedHandler = () => {
  loading.value = false
}

// 渲染失败
const errorHandler = () => {
  loading.value = false
}

// 文件改变处理
const handleFileChange = (uploadFile) => {
  const file = uploadFile.raw
  const reader = new FileReader()

  reader.onload = (loadEvent) => {
    const arrayBuffer = loadEvent.target?.result
    src.value = arrayBuffer
  }

  reader.readAsArrayBuffer(file)
}
</script>

<template>
  <div v-loading="loading" class="container">
    <el-upload accept=".doc,.docx" :limit="1" :auto-upload="false" :on-change="handleFileChange">
      <el-button type="primary">点击上传</el-button>
      <template #tip>
        <div class="el-upload__tip">请上传.doc或.docx文件</div>
      </template>
    </el-upload>
    <div :style="{ height: 'calc(100vh - 350px)' }">
      <VueOfficeDocx
        :src="src"
        class="h-screen"
        @rendered="renderedHandler"
        @error="errorHandler"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
}

.h-screen {
  height: 100%;
}
</style>
