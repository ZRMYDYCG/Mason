<script setup lang="ts">
import { computed } from 'vue'
import { SystemThemeEnum } from '@/config'
import { useSettingStore } from '@/store/modules/setting.ts'

const settingStore = useSettingStore()

const isDark = computed(() => settingStore.isDark)

// 切换动画
async function toggleDark({ clientX: x, clientY: y }: MouseEvent) {
  const targetTheme = isDark.value ? SystemThemeEnum.LIGHT : SystemThemeEnum.DARK
  settingStore.setGlopTheme(targetTheme, targetTheme)
}
</script>

<template>
  <i @click="toggleDark" :class="['iconfont', isDark ? 'icon-taiyang' : 'icon-yueliang1']"></i>
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
