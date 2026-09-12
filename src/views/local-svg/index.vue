<script setup lang="ts">
const iconGroups = [
  {
    title: '导航菜单',
    icons: ['chart-bar', 'settings', 'users', 'shield-check', 'menu', 'network', 'scroll-text']
  },
  {
    title: '操作按钮',
    icons: ['search', 'plus', 'square-pen', 'trash-2', 'refresh-cw', 'x', 'check']
  },
  {
    title: '界面状态',
    icons: ['bell', 'user', 'lock-keyhole', 'images', 'layout-grid', 'monitor-dot', 'route']
  }
]
</script>

<template>
  <div class="icon-gallery">
    <section v-for="group in iconGroups" :key="group.title" class="gallery-section">
      <h3>{{ group.title }}</h3>
      <div class="icon-grid">
        <div v-for="name in group.icons" :key="name" class="icon-card">
          <AllLucideIcon :name="name" :size="28" />
          <span>{{ name }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.icon-gallery {
  display: grid;
  gap: 18px;
}

.gallery-section {
  padding: 18px;
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: 8px;
}

.gallery-section h3 {
  margin: 0 0 14px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(132px, 1fr));
  gap: 12px;
}

.icon-card {
  display: flex;
  gap: 10px;
  align-items: center;
  min-height: 48px;
  padding: 10px 12px;
  color: var(--text-primary);
  background: var(--fill-secondary);
  border-radius: 8px;
}

.icon-card span {
  overflow: hidden;
  font-size: 13px;
  color: var(--text-secondary);
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
