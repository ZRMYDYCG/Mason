<script setup lang="ts">
const stacks = [
  { name: 'Vue.js', mark: 'V', tone: 'green' },
  { name: 'TypeScript', mark: 'TS', tone: 'blue' },
  { name: 'Vite', mark: '⚡', tone: 'purple' },
  { name: 'Pinia', mark: '🍍', tone: 'yellow' },
  { name: 'Element Plus', mark: 'E', tone: 'blue' },
  { name: 'UnoCSS', mark: '⚡', tone: 'green' },
  { name: 'ESLint', mark: '◇', tone: 'purple' },
  { name: 'Prettier', mark: '▤', tone: 'neutral' }
]
</script>

<template>
  <div class="tech-stack">
    <div v-for="item in stacks" :key="item.name" class="tech-item" :data-tone="item.tone">
      <span>{{ item.mark }}</span>
      <strong>{{ item.name }}</strong>
    </div>
  </div>
</template>

<style scoped>
.tech-stack {
  display: grid;
  grid-template-columns: repeat(8, minmax(64px, 1fr));
  gap: 18px;
  margin: 18px 0 24px;
}

.tech-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  min-width: 0;
}

.tech-item span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  font-size: 18px;
  font-weight: 800;
  background: var(--fill-primary-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  box-shadow: 0 12px 28px color-mix(in srgb, var(--shadow-color) 30%, transparent);
}

.tech-item strong {
  max-width: 82px;
  overflow: hidden;
  font-size: 12px;
  font-weight: 650;
  color: var(--text-primary);
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tech-item[data-tone='green'] span {
  color: #2f9e44;
}

.tech-item[data-tone='blue'] span {
  color: #246bfe;
}

.tech-item[data-tone='purple'] span {
  color: #7157f8;
}

.tech-item[data-tone='yellow'] span {
  color: #e2a300;
}

.tech-item[data-tone='neutral'] span {
  color: var(--text-secondary);
}

@media (width <= 1100px) {
  .tech-stack {
    grid-template-columns: repeat(4, minmax(64px, 1fr));
  }
}

@media (width <= 560px) {
  .tech-stack {
    grid-template-columns: repeat(2, minmax(64px, 1fr));
  }
}
</style>
