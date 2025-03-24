<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  dotColor?: string
}>()

const dotStyle = computed(() => ({
  backgroundColor: props.dotColor || 'var(--assistant-bubble)'
}))
</script>

<template>
  <div class="typing-indicator">
    <div class="dot" :style="dotStyle"></div>
    <div class="dot" :style="dotStyle"></div>
    <div class="dot" :style="dotStyle"></div>
  </div>
</template>

<style lang="scss">
.typing-indicator {
  display: flex;
  padding: 16px;
  gap: 8px;
  align-items: center;
  justify-content: center;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    opacity: 0.4;

    &:nth-child(1) {
      animation: pulse 1.4s infinite ease-in-out;
    }

    &:nth-child(2) {
      animation: pulse 1.4s infinite ease-in-out 0.2s;
    }

    &:nth-child(3) {
      animation: pulse 1.4s infinite ease-in-out 0.4s;
    }
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}
</style>
