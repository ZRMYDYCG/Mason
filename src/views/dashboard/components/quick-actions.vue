<script setup lang="ts">
import AppIcon from '@/components/AppIcon/index.vue'

const actions = [
  { key: 'project', label: 'New Project', icon: 'plus' },
  { key: 'upload', label: 'Upload Asset', icon: 'upload' },
  { key: 'invite', label: 'Invite Member', icon: 'user-plus' },
  { key: 'docs', label: 'View Docs', icon: 'file-text', href: 'https://mason.versakit.online' }
]

const onClick = (action: (typeof actions)[number]) => {
  if (action.href) window.open(action.href, '_blank')
}
</script>

<template>
  <section class="panel actions">
    <header class="panel-head">
      <h3>Quick Actions</h3>
    </header>
    <div class="grid">
      <button
        v-for="action in actions"
        :key="action.key"
        type="button"
        class="action"
        @click="onClick(action)"
      >
        <span class="icon-wrap">
          <AppIcon :name="action.icon" :size="18" />
        </span>
        <span>{{ action.label }}</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.panel {
  height: 100%;
  padding: 22px;
  background: var(--bg-surface);
  border: var(--box-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--box-shadow);
}

.panel-head h3 {
  margin: 0 0 18px;
  font-size: 16px;
  font-weight: 650;
  color: var(--text-primary);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.action {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  min-height: 96px;
  padding: 16px;
  font-size: 13px;
  font-weight: 550;
  color: var(--text-primary);
  text-align: left;
  cursor: pointer;
  background: var(--fill-primary-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.action:hover {
  background: var(--fill-primary);
  border-color: var(--border-light);
  transform: translateY(-1px);
}

.icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  color: var(--text-secondary);
  background: var(--bg-surface);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
}
</style>
