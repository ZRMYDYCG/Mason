<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { createSSEConnection } from '@/utils/sse'
import { useMessage } from '@/components/Toast/index.ts'

const inputMessage = ref('')
const accumulatedResponse = ref('')
const webSearchList = ref<string[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const abortController = ref<AbortController | null>(null)

const message = useMessage()

async function sendMessage() {
  if (!inputMessage.value.trim()) return

  try {
    // 重置状态
    isLoading.value = true
    error.value = null
    accumulatedResponse.value = ''

    // 创建中止控制器
    abortController.value = new AbortController()

    await createSSEConnection({
      url: 'http://127.0.0.1:3000/ai/create-completions',
      body: {
        messages: [{ role: 'user', content: inputMessage.value }]
      },
      onMessage: (chunk) => {
        if (chunk !== '[DONE]') {
          if (JSON.parse(chunk).choices[0].finish_reason === 'stop') {
            message.success('结束对话')
            if (JSON.parse(chunk).web_search) {
              webSearchList.value = JSON.parse(chunk).web_search
            }
            return
          } else {
            accumulatedResponse.value += JSON.parse(chunk).choices[0].delta.content
          }
        }
      },
      onError: (err) => {
        error.value = `请求失败: ${err.message}`
      }
    })
  } catch (err) {
    error.value = `请求异常: ${(err as Error).message}`
  } finally {
    isLoading.value = false
    abortController.value = null
  }
}

// 组件卸载时中止请求
onUnmounted(() => {
  if (abortController.value) {
    abortController.value?.abort()
  }
})
</script>

<template>
  <div class="sse-container">
    <!-- 消息输入区域 -->
    <div class="input-section">
      <textarea v-model="inputMessage" placeholder="输入你的消息..." />
      <button @click="sendMessage" :disabled="isLoading">
        {{ isLoading ? '发送中...' : '发送' }}
      </button>
    </div>

    <!-- 流式响应展示区域 -->
    <div class="response-container">
      <div v-if="isLoading" class="loading-indicator">
        <div class="loader"></div>
        <span>思考中...</span>
      </div>
      <div class="response-content">
        <pre>{{ accumulatedResponse }}</pre>
      </div>
    </div>

    <!--  联网处理展示  -->
    {{ webSearchList }}

    <!-- 错误提示 -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.sse-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.input-section {
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.response-container {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  min-height: 200px;
  position: relative;
}

.loading-indicator {
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-message {
  color: #dc3545;
  margin-top: 10px;
  padding: 10px;
  background: #f8d7da;
  border-radius: 4px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
