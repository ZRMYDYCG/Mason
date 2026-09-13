<script setup lang="ts">
import AppIcon from '@/components/AppIcon/index.vue'

const features = [
  {
    title: '开箱即用',
    desc: '内置丰富的业务组件，快速搭建管理系统。',
    icon: 'zap'
  },
  {
    title: '灵活可定制',
    desc: '支持多种布局方式与主题配置，满足不同项目需求。',
    icon: 'sliders-horizontal'
  },
  {
    title: '开发者友好',
    desc: '清晰的目录结构与完善的文档，降低学习成本。',
    icon: 'code-xml'
  },
  {
    title: '持续迭代',
    desc: '保持活跃维护，与社区共同成长。',
    icon: 'settings'
  }
]
</script>

<template>
  <div class="feature-grid">
    <article v-for="item in features" :key="item.title" class="feature-card">
      <span class="feature-icon">
        <AppIcon :name="item.icon" :size="22" />
      </span>
      <h3>{{ item.title }}</h3>
      <p>{{ item.desc }}</p>
    </article>
  </div>
</template>

<style scoped>
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin: 18px 0 36px;
}

.feature-card {
  min-height: 164px;
  padding: 20px 18px;
  background: color-mix(in srgb, var(--bg-surface) 86%, var(--fill-primary));
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: 0 18px 38px color-mix(in srgb, var(--shadow-color) 35%, transparent);
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-bottom: 18px;
  color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 9%, transparent);
  border-radius: var(--radius-md);
}

.feature-card h3 {
  margin: 0 0 10px;
  font-size: 17px;
  font-weight: 750;
  color: var(--text-primary);
}

.feature-card p {
  margin: 0;
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-secondary);
}

@media (width <= 1100px) {
  .feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (width <= 560px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
