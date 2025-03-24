<script setup lang="ts">
import { computed } from 'vue'
import { Message, ChatConfig } from './types'
import MessageList from './components/message-list.vue'
import ChatInput from './components/chat-input.vue'
import TypingIndicator from './components/typing-indicator.vue'
import useChat from './hooks/useChat'
import useMarkdown from './hooks/useMarkdown'

const props = withDefaults(
  defineProps<{
    initialMessages?: Message[]
    config?: Partial<ChatConfig>
  }>(),
  {
    initialMessages: () => [],
    config: () => ({})
  }
)

const { messages, sendMessage, isTyping } = useChat(props.initialMessages)
const { renderMarkdown } = useMarkdown(props.config.markdownOptions)

const themeClass = computed(() => `chat-theme-${props.config.theme || 'light'}`)
</script>

<template>
  <div class="chat-container" :class="themeClass">
    <div class="chat-header">
      <slot name="header">
        <h2>AIGC Chat</h2>
      </slot>
    </div>

    <div class="chat-content">
      <MessageList :messages="messages" :config="config" :render-markdown="renderMarkdown" />
      <TypingIndicator v-if="isTyping" />
    </div>

    <div class="chat-footer">
      <ChatInput @send="sendMessage" />
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;

  &.chat-theme-light {
    --bg-color: #f5f5f5;
    --text-color: #333;
    --user-bubble: #007bff;
    --assistant-bubble: #e9ecef;
    --system-bubble: #28a745;
  }

  &.chat-theme-dark {
    --bg-color: #2d3748;
    --text-color: #f8f9fa;
    --user-bubble: #4299e1;
    --assistant-bubble: #4a5568;
    --system-bubble: #48bb78;
  }

  .chat-header {
    padding: 16px;
    background-color: var(--bg-color);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .chat-content {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    background-color: var(--bg-color);
  }

  .chat-footer {
    padding: 16px;
    background-color: var(--bg-color);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
}
</style>
