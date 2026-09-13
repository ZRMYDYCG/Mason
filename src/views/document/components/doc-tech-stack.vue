<script setup lang="ts">
import { Icon, addIcon } from '@iconify/vue'
import iconVue from '@iconify-icons/logos/vue'
import iconTypescript from '@iconify-icons/logos/typescript-icon'
import iconVite from '@iconify-icons/logos/vitejs'
import iconPinia from '@iconify-icons/logos/pinia'
import iconElement from '@iconify-icons/logos/element'
import iconTailwind from '@iconify-icons/logos/tailwindcss-icon'
import iconEslint from '@iconify-icons/logos/eslint'
import iconPrettier from '@iconify-icons/logos/prettier'

addIcon('logos:vue', iconVue)
addIcon('logos:typescript-icon', iconTypescript)
addIcon('logos:vitejs', iconVite)
addIcon('logos:pinia', iconPinia)
addIcon('logos:element', iconElement)
addIcon('logos:tailwindcss-icon', iconTailwind)
addIcon('logos:eslint', iconEslint)
addIcon('logos:prettier', iconPrettier)

const stacks = [
  { name: 'Vue.js', icon: 'logos:vue' },
  { name: 'TypeScript', icon: 'logos:typescript-icon' },
  { name: 'Vite', icon: 'logos:vitejs' },
  { name: 'Pinia', icon: 'logos:pinia' },
  { name: 'Element Plus', icon: 'logos:element' },
  { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
  { name: 'ESLint', icon: 'logos:eslint' },
  { name: 'Prettier', icon: 'logos:prettier' }
]
</script>

<template>
  <div class="tech-stack">
    <div v-for="item in stacks" :key="item.name" class="tech-item">
      <span class="tech-logo">
        <Icon :icon="item.icon" width="28" height="28" />
      </span>
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

.tech-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  background: color-mix(in srgb, var(--bg-surface) 88%, var(--fill-primary));
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}

.tech-item strong {
  max-width: 88px;
  overflow: hidden;
  font-size: 12px;
  font-weight: 650;
  color: var(--text-primary);
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
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
