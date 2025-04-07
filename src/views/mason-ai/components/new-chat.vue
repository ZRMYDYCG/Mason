<script setup lang="ts">
import ChatInput from './chat-input.vue'

const inputText = ref('')
const isLoading = ref(false)

const handleSend = (value) => {
  isLoading.value = true
}
</script>

<template>
  <div class="new-chat">
    <div class="welcome-content">
      <div class="welcome-message">
        <div class="ds-icon" style="font-size: 60px; width: 60px; height: 60px">
          <img src="/ai.svg" alt="ai" />
        </div>
        我是 Mason，你的 AI 助手，很高兴见到你！
      </div>
      <div class="welcome-subtitle">
        我可以帮你写代码、读文件、写作各种创意内容，请把你的任务交给我吧~
      </div>
      <ChatInput
        v-model="inputText"
        :loading="isLoading"
        placeholder="请输入你的问题..."
        @send="handleSend"
      />
    </div>
    <div class="footer-notice">内容由 AI 生成，请仔细甄别</div>
  </div>
</template>

<style scoped lang="scss">
.new-chat {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 64px;
  position: relative;
}

.welcome-content {
  color: #000;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 24px;
  transform: translateY(-100px);
}

.welcome-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  font-size: 18px;
  margin-bottom: 12px;
}

.welcome-subtitle {
  color: #666;
  font-size: 14px;
  max-width: 480px;
  line-height: 1.5;
  margin-bottom: 14px;
}

.footer-notice {
  font-size: 12px;
  color: rgb(163 163 163);
  margin: 6px 0;
  line-height: 14px;
  text-align: center;
  width: 100%;
  position: absolute;
  bottom: 20px;
  left: 0;
}
</style>
