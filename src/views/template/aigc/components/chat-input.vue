<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'send', content: string): void
}>()

const message = ref('')

const handleSend = () => {
  if (message.value.trim()) {
    emit('send', message.value)
    message.value = ''
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}
</script>

<template>
  <div class="chat-input-container">
    <textarea
      v-model="message"
      @keydown="handleKeyDown"
      placeholder="Type your message..."
      rows="1"
      class="chat-input"
    ></textarea>
    <button @click="handleSend" class="send-button">
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss">
.chat-input-container {
  display: flex;
  align-items: flex-end;
  gap: 5px;
  background-color: white;
  border-radius: 24px;
  padding: 11px 16px;
}

.chat-input {
  flex: 1;
  border: none;
  resize: none;
  max-height: 120px;
  outline: none;
  font-family: inherit;
  font-size: 16px;
  line-height: 1.5;

  &:focus {
    outline: none;
  }
}

.send-button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--user-bubble);
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
