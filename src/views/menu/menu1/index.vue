<template>
  <div class="card content-box">
    <span class="text">我是menu1</span>
    <el-input v-model="value" placeholder="测试缓存"></el-input>
    <input type="file" ref="fileInput" @change="handleFileUpload" style="margin-top: 20px" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const value = ref<string>('')
const fileInput = ref<HTMLInputElement | null>(null)

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) {
    ElMessage.warning('请选择上传的文件')
    return
  }

  const formData = new FormData()
  formData.append(
    'key',
    'chv_EWRq_dd18a6e676f6e61123e90a6ac537ff571d99121c1c06860279ee4620ad95a53139029b6f0b154b60631e11950e051afa4c27846c9ac55593d8cf7104c1216300'
  )
  formData.append('source', file)

  try {
    const response = await fetch('/file', {
      method: 'POST',
      body: formData
    } as any)
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped lang="scss">
.card {
  padding: 20px;
}
</style>
