<script setup lang="ts">
import { computed } from 'vue'
import { useSettingStore } from '@/store/modules/setting'
import { MenuThemeEnum } from '@/config'

const settingStore = useSettingStore()
const menuTheme = computed(() => settingStore.getMenuTheme)
const isSystemDark = computed(() => settingStore.isDark)
const topbarBg = computed(() => menuTheme.value.tabBarBackground)
const topbarTextColor = computed(() => {
  if (!isSystemDark.value && menuTheme.value.theme === MenuThemeEnum.DARK) return 'var(--app-text-inverse)'
  return menuTheme.value.textColor
})
const topbarTextSecondaryColor = computed(() => {
  if (!isSystemDark.value && menuTheme.value.theme === MenuThemeEnum.DARK)
    return 'rgb(255 255 255 / 72%)'
  return menuTheme.value.systemNameColor
})
const tabsActiveBg = computed(() => {
  if (!isSystemDark.value && menuTheme.value.theme === MenuThemeEnum.DARK) return 'var(--app-bg-active)'
  return 'var(--app-bg-active-light)'
})
const tabsActiveText = computed(() => {
  if (!isSystemDark.value && menuTheme.value.theme === MenuThemeEnum.DARK) return 'var(--app-text-inverse)'
  return 'var(--app-text-active)'
})
</script>

<template>
  <el-container
    class="layout"
    :style="{
      '--layout-topbar-bg': topbarBg,
      '--layout-topbar-text': topbarTextColor,
      '--layout-topbar-text-secondary': topbarTextSecondaryColor,
      '--layout-tabs-active-bg': tabsActiveBg,
      '--layout-tabs-active-text': tabsActiveText
    }"
  >
    <slot name="beforeAside" />
    <slot name="aside" />
    <el-container>
      <el-header>
        <div class="flex gap-2">
          <slot name="headerLeft" />
        </div>
        <slot name="headerRight" />
      </el-header>
      <slot name="main" />
      <slot name="footer" />
    </el-container>
  </el-container>
  <slot name="overlay" />
</template>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100%;
  scrollbar-width: none;
}

.layout {
  :deep(.el-aside) {
    width: auto;
    background-color: var(--layout-topbar-bg, var(--app-bg-surface));
  }

  :deep(.el-aside .aside) {
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: width 0.3s ease;
  }

  :deep(.el-aside .aside .el-scrollbar) {
    position: relative;
    height: calc(100% - 55px);
  }

  :deep(.el-aside .aside .el-scrollbar .el-menu) {
    width: 100%;
    overflow-x: hidden;
    border-right: none;
  }

  :deep(.el-header) {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    padding: 0 15px;
    color: var(--layout-topbar-text, var(--app-text));
    --el-text-color-primary: var(--layout-topbar-text, var(--app-text));
    --el-text-color-regular: var(--layout-topbar-text, var(--app-text));
    --el-text-color-secondary: var(--layout-topbar-text-secondary, var(--app-text-secondary));
    background-color: var(--layout-topbar-bg, var(--app-bg-surface));
  }
}
</style>
