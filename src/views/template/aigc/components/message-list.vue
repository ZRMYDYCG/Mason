<script setup lang="ts">
import { Message, ChatConfig } from '../types'
import MessageBubble from './message-bubble.vue'

defineProps<{
  messages: Message[]
  config: ChatConfig
  renderMarkdown: (content: string) => string
}>()
</script>

<template>
  <div class="message-list">
    <div v-for="message in messages" :key="message.id" class="message-container">
      <MessageBubble
        :message="message"
        :config="config"
        :rendered-content="renderMarkdown(message.content)"
      />
    </div>
  </div>
</template>

<style lang="scss">
.message-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message-container {
  display: flex;
  flex-direction: column;

  &.user-message {
    align-items: flex-end;
  }

  &.assistant-message {
    align-items: flex-start;
  }

  &.system-message {
    align-items: center;
  }
}
</style>
