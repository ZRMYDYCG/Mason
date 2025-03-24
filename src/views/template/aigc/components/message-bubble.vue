<script setup lang="ts">
import { computed } from 'vue'
import { Message, ChatConfig } from '../types'

const props = defineProps<{
  message: Message
  config: ChatConfig
  renderedContent: string
}>()

const bubbleClass = computed(() => {
  return {
    'message-bubble': true,
    [`message-${props.message.role}`]: true,
    [`message-${props.message.type || 'text'}`]: true,
    [props.message.status || 'sent']: true
  }
})

const avatar = computed(() => {
  return props.config.showAvatars ? props.config.avatarMapping?.[props.message.role] : null
})
</script>

<template>
  <div class="message-wrapper" :class="`role-${message.role}`">
    <div v-if="avatar" class="message-avatar">
      <img :src="avatar" :alt="message.role" />
    </div>

    <div :class="bubbleClass" v-html="renderedContent"></div>
  </div>
</template>

<style lang="scss">
.message-wrapper {
  display: flex;
  gap: 12px;
  max-width: 85%;

  &.role-user {
    flex-direction: row-reverse;
  }

  &.role-assistant {
    flex-direction: row;
  }

  &.role-system {
    justify-content: center;
    width: 100%;
  }
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.message-bubble {
  padding: 12px 16px;
  border-radius: 16px;
  line-height: 1.5;
  position: relative;
  word-wrap: break-word;

  &.message-user {
    background-color: var(--user-bubble);
    color: white;
    border-bottom-right-radius: 4px;
  }

  &.message-assistant {
    background-color: var(--assistant-bubble);
    color: var(--text-color);
    border-bottom-left-radius: 4px;
  }

  &.message-system {
    background-color: var(--system-bubble);
    color: white;
    font-size: 13.6px;
    padding: 8px 16px;
  }

  &.message-code {
    font-family: monospace;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow-x: auto;
  }

  &.message-image img {
    max-width: 100%;
    border-radius: 8px;
  }

  &.sending {
    opacity: 0.7;
  }

  &.failed {
    border: 1px solid #ff6b6b;
  }
}
</style>
