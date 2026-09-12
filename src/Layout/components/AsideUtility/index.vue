<script setup lang="ts">
import { computed } from 'vue'
import mittBus from '@/utils/mittBus'
import { useGlobalStore } from '@/store/modules/global'
import AppIcon from '@/components/AppIcon/index.vue'

const globalStore = useGlobalStore()
const isCollapse = computed(() => globalStore.isCollapse)

const openSettings = () => {
  mittBus.emit('openThemeDrawer')
}

const openHelp = () => {
  window.open('https://mason.versakit.online', '_blank')
}
</script>

<template>
  <div class="aside-utility" :class="{ compact: isCollapse }">
    <div class="divider" aria-hidden="true" />
    <button type="button" class="utility-item" @click="openSettings">
      <AppIcon name="settings" :size="18" />
      <span v-show="!isCollapse" class="label">设置</span>
    </button>
    <button type="button" class="utility-item" @click="openHelp">
      <AppIcon name="circle-help" :size="18" />
      <span v-show="!isCollapse" class="label">帮助与支持</span>
    </button>
  </div>
</template>

<style scoped>
.aside-utility {
  flex-shrink: 0;
  padding: 4px 0 8px;
}

.divider {
  height: 1px;
  margin: 4px 18px 10px;
  background: var(--border-subtle);
}

.utility-item {
  display: flex;
  gap: 10px;
  align-items: center;
  width: calc(100% - 24px);
  height: 44px;
  padding: 0 14px;
  margin: 3px 12px;
  font-size: 14px;
  color: inherit;
  cursor: pointer;
  background: transparent;
  border: none;
  border-radius: 12px;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.utility-item:hover {
  color: var(--color-primary);
  background-color: rgba(var(--color-primary-rgb), 0.08);
}

.utility-item:focus-visible {
  outline: 2px solid rgba(var(--color-primary-rgb), 0.35);
  outline-offset: -2px;
}

.label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.aside-utility.compact .utility-item {
  justify-content: center;
  width: calc(100% - 16px);
  padding: 0;
  margin: 4px 8px;
}

.aside-utility.compact .divider {
  margin: 4px 12px 8px;
}

html.dark .utility-item:hover {
  background-color: rgba(var(--color-primary-rgb), 0.16);
}
</style>
