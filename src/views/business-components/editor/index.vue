<template>
  <div class="container">
    <h2>富文本编辑器</h2>

    <!-- 基本使用 -->
    <RichTextEditor v-model="content" />

    <!-- 带表单提交的示例 -->
    <el-form class="editor-form" @submit.prevent="handleSubmit">
      <RichTextEditor v-model="formData.content" />

      <div class="action-btns">
        <el-button type="primary" native-type="submit">提交内容</el-button>
        <el-button @click="handleClear">清空内容</el-button>
      </div>
    </el-form>

    <!-- 内容预览 -->
    <div class="preview-section">
      <h3>实时预览：</h3>
      <div class="preview-content" v-html="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RichTextEditor from '@/components/Editor/index.vue'
import { ElMessage } from 'element-plus'

// 基本用法数据
const content = ref('<p>初始内容</p>')

// 表单数据
const formData = ref({
  content: '<p>表单初始内容</p>'
})

// 提交处理
const handleSubmit = () => {
  if (!formData.value.content.trim()) {
    ElMessage.warning('内容不能为空')
    return
  }

  console.log('提交内容：', formData.value.content)
  ElMessage.success('提交成功！')
}

// 清空内容
const handleClear = () => {
  formData.value.content = ''
  ElMessage.info('内容已清空')
}
</script>

<style lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  h2 {
    margin-bottom: 30px;
    color: var(--el-color-primary);
  }
}

.editor-form {
  margin: 40px 0;
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  padding: 20px;
  background: var(--el-bg-color);

  .action-btns {
    margin-top: 20px;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }
}

.preview-section {
  margin-top: 40px;
  padding: 20px;
  border: 1px dashed var(--el-border-color);
  border-radius: 8px;

  h3 {
    margin-bottom: 15px;
    color: var(--el-text-color-secondary);
  }

  .preview-content {
    line-height: 1.6;

    /* 预览内容样式重置 */
    p {
      margin: 1em 0;
    }
    ul,
    ol {
      padding-left: 2em;
    }
    img {
      max-width: 100%;
    }
    table {
      border-collapse: collapse;
    }
    td,
    th {
      padding: 8px;
      border: 1px solid #ddd;
    }
    pre {
      padding: 1em;
      background: var(--el-bg-color-page);
      border-radius: 4px;
    }
  }
}

/* 适配暗黑模式 */
@media (prefers-color-scheme: dark) {
  .preview-content {
    td,
    th {
      border-color: #444;
    }
  }
}
</style>
