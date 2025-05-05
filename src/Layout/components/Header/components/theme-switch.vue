<script setup lang="ts">
import { themeAnimation } from '@/utils/animation.ts'
import { useSettingStore } from '@/store/modules/setting.ts'
import { computed } from 'vue'

const settingStore = useSettingStore()
const isDark = computed(() => settingStore.isDark)
</script>

<template>
  <i @click="themeAnimation" :class="['iconfont', isDark ? 'icon-taiyang' : 'icon-yueliang1']"></i>
</template>

<style scoped lang="scss">
$mason-grey-300-rgb: rgb(245, 245, 245) !default;
i {
  display: block;
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    color: var(--mason-grey-700);
    background-color: rgb($mason-grey-300-rgb, 0.5);
    font-weight: bold;
  }
}
</style>
