<template>
  <AppIcon @click="openDrawer" name="settings" />
</template>

<script setup lang="ts">
import mittBus from '@/utils/mittBus.ts'
const openDrawer = () => {
  mittBus.emit('openThemeDrawer')
}
</script>

<style lang="scss" scoped></style>
