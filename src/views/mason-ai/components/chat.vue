<script setup lang="ts">
import NewChat from './new-chat.vue'
import DoingChat from './doing-chat.vue'
</script>

<template>
  <div class="chat">
    <new-chat v-if="false" />
    <doing-chat />
  </div>
</template>

<style scoped lang="scss">
.chat {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  min-width: 0;
  height: 100%;
}
</style>
