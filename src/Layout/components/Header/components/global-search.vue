<template>
  <div class="global-search">
    <GlobalSearchTrigger @open="visible = true" />
    <GlobalSearchDialog v-model="visible" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import GlobalSearchDialog from './global-search-dialog.vue'
import GlobalSearchTrigger from './global-search-trigger.vue'

const visible = ref(false)

const shouldIgnoreShortcut = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable
}

const handleKeydown = (event: KeyboardEvent) => {
  if (shouldIgnoreShortcut(event.target)) return
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    visible.value = true
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.global-search {
  display: inline-flex;
  align-items: center;
}
</style>
