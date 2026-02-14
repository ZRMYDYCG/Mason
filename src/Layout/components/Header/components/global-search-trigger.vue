<template>
  <button
    class="global-search-trigger"
    type="button"
    :aria-label="t('search.open')"
    @click="emit('open')"
  >
    <AppIcon name="search" :size="16" />
    <span class="placeholder">{{ t('search.placeholder') }}</span>
    <span class="shortcut">Ctrl K</span>
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

const emit = defineEmits<{
  (e: 'open'): void
}>()
</script>

<style scoped>
.global-search-trigger {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  height: 32px;
  padding: 0 10px;
  color: var(--layout-topbar-text-secondary, var(--text-secondary));
  cursor: pointer;
  background-color: rgb(255 255 255 / 8%);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

.global-search-trigger:hover {
  color: var(--layout-topbar-text, var(--text-primary));
  background-color: rgba(var(--color-primary-rgb), 0.08);
  border-color: var(--border-default);
}

.global-search-trigger:focus-visible {
  outline: 2px solid rgba(var(--color-primary-rgb), 0.35);
  outline-offset: 2px;
}

.placeholder {
  font-size: 13px;
  white-space: nowrap;
}

.shortcut {
  padding: 2px 6px;
  font-size: 11px;
  line-height: 1;
  color: var(--layout-topbar-text-secondary, var(--text-secondary));
  background-color: rgba(var(--color-primary-rgb), 0.12);
  border-radius: 6px;
}

@media screen and (width <= 1200px) {
  .placeholder {
    display: none;
  }
}

@media screen and (width <= 768px) {
  .shortcut {
    display: none;
  }
}
</style>
