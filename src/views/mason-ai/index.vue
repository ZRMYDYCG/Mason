<script setup lang="ts">
import Aside from './components/aside.vue'
import Chat from './components/chat.vue'
</script>

<template>
  <div class="mason-ai">
    <Aside />
    <Chat />
  </div>
</template>

<style scoped lang="scss">
.mason-ai {
  display: flex;
  height: 100%;
  overflow: hidden;
}
</style>
