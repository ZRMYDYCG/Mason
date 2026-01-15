<script setup lang="ts">
import { themeAnimation } from '@/utils/animation.ts'
import { useSettingStore } from '@/store/modules/setting.ts'
import { computed } from 'vue'

const settingStore = useSettingStore()
const isDark = computed(() => settingStore.isDark)
</script>

<template>
  <AppIcon
    @click="themeAnimation"
    :name="isDark ? 'sun' : 'moon'"
  />
</template>

<style scoped lang="scss"></style>
