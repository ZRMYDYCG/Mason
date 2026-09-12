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
  gap: 10px;
  align-items: center;
  min-width: 220px;
  height: 36px;
  padding: 0 14px;
  color: var(--layout-topbar-text-secondary, var(--text-secondary));
  cursor: pointer;
  background-color: var(--fill-primary-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;
}

.global-search-trigger:hover {
  color: var(--layout-topbar-text, var(--text-primary));
  background-color: var(--fill-primary);
  border-color: var(--border-light);
  box-shadow: var(--shadow-xs);
}

.global-search-trigger:focus-visible {
  outline: 2px solid rgba(var(--color-primary-rgb), 0.35);
  outline-offset: 2px;
}

.placeholder {
  flex: 1;
  font-size: 13px;
  text-align: left;
  white-space: nowrap;
}

.shortcut {
  padding: 3px 7px;
  font-size: 11px;
  line-height: 1;
  color: var(--layout-topbar-text-secondary, var(--text-secondary));
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}

@media screen and (width <= 1200px) {
  .global-search-trigger {
    min-width: 0;
  }

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
