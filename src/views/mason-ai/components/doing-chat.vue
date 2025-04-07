<script setup lang="ts">
import { ref, onUnmounted, watch, computed, nextTick } from 'vue'
import ChatInput from './chat-input.vue'
import MarkdownRenderer from './markdown-renderer.vue'
import { useChatStore } from '@/store/modules/mason-ai.ts'
import { useMessage } from '@/components/Toast/index.ts'

const inputMessage = ref('')
const chatStore = useChatStore()
const message = useMessage()
const messagesContainer = ref<HTMLElement>()
const scrollInterval = ref<number>()

const isLoading = computed(() => chatStore.isLoading)

async function sendMessage() {
  if (!inputMessage.value.trim()) return
  await chatStore.sendMessage(inputMessage.value)
  inputMessage.value = ''

  if (!chatStore.isLoading) {
    message.success('结束对话')
  }
}

function scrollToBottom() {
  nextTick(() => {
    requestAnimationFrame(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTo({
          top: messagesContainer.value.scrollHeight,
          behavior: 'smooth'
        })
      }
    })
  })
}

// 监听加载状态变化
watch(isLoading, (newVal) => {
  if (newVal) {
    // 开始加载时启动定时滚动
    scrollInterval.value = window.setInterval(scrollToBottom, 100)
  } else {
    // 加载完成时清除定时器并最后滚动一次
    clearInterval(scrollInterval.value)
    scrollToBottom()
  }
})

// 保留原有消息数量变化监听
watch(() => chatStore.messages.length, scrollToBottom)

onUnmounted(() => {
  chatStore.abortRequest()
  clearInterval(scrollInterval.value)
})
</script>

<template>
  <div class="layout-container">
    <div class="header-bar">
      <div class="header-content">
        <div class="title-container">
          <h1 class="page-title">全局覆盖Dialog动画与质感增强SCSS</h1>
        </div>
        <div class="header-shadow"></div>
      </div>
    </div>

    <div class="messages-container" ref="messagesContainer">
      <div
        v-for="(msg, index) in chatStore.messages"
        :key="index"
        :class="['message-item', msg.role]"
      >
        <div class="message-content">
          <div v-if="msg.role === 'assistant' && !msg.content" class="loading-dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
          <MarkdownRenderer v-else-if="msg.role === 'assistant'" :content="msg.content" />
          <template v-else>{{ msg.content }}</template>
        </div>
        <div
          v-if="isLoading && index === chatStore.messages.length - 1"
          class="streaming-indicator"
        >
          <div class="dot-flashing"></div>
        </div>
      </div>
    </div>

    <div class="input-container">
      <chat-input
        v-model="inputMessage"
        :loading="chatStore.isLoading"
        placeholder="请输入你的问题..."
        @send="sendMessage"
      ></chat-input>
      <div class="input-notice">内容由 AI 生成，请仔细甄别</div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.layout-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-width: 360px;

  .header-bar {
    background: white;
    flex-shrink: 0;
    height: 56px;
    padding-top: 10px;
    position: relative;

    .header-content {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: 0 32px;
      position: relative;

      .title-container {
        display: flex;
        justify-content: center;

        .page-title {
          font-size: 1.2rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
      }

      .header-shadow {
        position: absolute;
        bottom: -32px;
        left: 0;
        right: 0;
        height: 32px;
        background: linear-gradient(rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%);
        pointer-events: none;
        z-index: 10;
      }
    }
  }

  .messages-container {
    flex: 1;
    overflow: auto;
    padding: 0 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;

    .message-item {
      margin: 12px 0;
      max-width: 85%;
      padding: 12px 16px;
      line-height: 1.6;
      transition: all 0.3s ease;
      width: fit-content;
      box-sizing: border-box;

      &.user {
        align-self: flex-end;
        background: #f0f7ff;
        border-radius: 12px 12px 0 12px;
      }

      &.assistant {
        align-self: flex-start;
        border-radius: 12px 12px 12px 0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .message-content {
        max-width: 100%;

        .loading-dots {
          display: flex;
          padding: 16px;
          gap: 4px;

          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #ddd;
            animation: dot-pulse 1.4s infinite ease-in-out;

            &:nth-child(2) {
              animation-delay: 0.2s;
            }
            &:nth-child(3) {
              animation-delay: 0.4s;
            }
          }
        }
      }

      .streaming-indicator {
        position: absolute;
        bottom: -24px;
        left: 0;
        color: #666;
        font-size: 12px;

        .dot-flashing {
          position: relative;
          width: 6px;
          height: 6px;
          border-radius: 3px;
          background-color: #999;
          animation: dot-flashing 1s infinite linear alternate;
          animation-delay: 0.5s;

          &::before,
          &::after {
            content: '';
            display: inline-block;
            position: absolute;
            top: 0;
            width: 6px;
            height: 6px;
            border-radius: 3px;
            background-color: #999;
          }

          &::before {
            left: -10px;
            animation: dot-flashing 1s infinite alternate;
            animation-delay: 0s;
          }

          &::after {
            left: 10px;
            animation: dot-flashing 1s infinite alternate;
            animation-delay: 1s;
          }
        }
      }
    }
  }

  .input-container {
    padding: 16px 0;
    position: sticky;
    bottom: 0;
    z-index: 20;
    width: 100%;

    .input-notice {
      text-align: center;
      font-size: 12px;
      color: #a3a3a3;
      margin-top: 6px;
    }
  }
}

@keyframes dot-pulse {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  30% {
    transform: translateY(-6px);
    opacity: 1;
  }
}

@keyframes dot-flashing {
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
</style>
