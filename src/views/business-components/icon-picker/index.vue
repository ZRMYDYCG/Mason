<script setup lang="ts">
import { ref } from 'vue'
import PickerContainer from './components/picker-container.vue'
const visible = ref(false)
</script>

<template>
  <div>
    <picker-container title="选择图标" v-model:visible="visible">
      <span>选择图标</span>
    </picker-container>
  </div>
</template>

<style scoped></style>
