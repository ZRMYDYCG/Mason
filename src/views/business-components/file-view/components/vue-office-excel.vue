<script setup lang="ts">
import '@vue-office/excel/lib/index.css'
import VueOfficeExcel from '@vue-office/excel'
import { reactive, ref } from 'vue'

import XlsxFile from '@/assets/office/test.xlsx?url'

defineOptions({
  name: 'VueOfficeExcel'
})

const loading = ref(true)
const src = ref(XlsxFile)
const options = reactive({
  xls: false,
  minColLength: 0,
  minRowLength: 0,
  widthOffset: 10,
  heightOffset: 10,
  beforeTransformData: (workbookData) => workbookData,
  transformData: (workbookData) => workbookData
})

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
    <el-upload accept=".xlsx,.xls" :limit="1" :auto-upload="false" :on-change="handleFileChange">
      <el-button type="primary">点击上传</el-button>
      <template #tip>
        <div class="el-upload__tip">请上传.xlsx或.xls格式文件</div>
      </template>
    </el-upload>
    <div :style="{ height: 'calc(100vh - 350px)' }">
      <VueOfficeExcel
        :src="src"
        :options="options"
        @rendered="renderedHandler"
        @error="errorHandler"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  padding: 20px;
}

.el-upload__tip {
  margin-top: 8px;
  color: #666;
  font-size: 12px;
}
</style>
