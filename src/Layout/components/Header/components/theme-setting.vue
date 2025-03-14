<template>
  <iconpark-icon
    @click="openDrawer"
    class="cursor-pointer mr-2"
    name="document-folder"
  ></iconpark-icon>
</template>

<script setup lang="ts">
import mittBus from '@/utils/mittBus.ts'
const openDrawer = () => {
  mittBus.emit('openThemeDrawer')
}
</script>

<style lang="scss" scoped></style>
