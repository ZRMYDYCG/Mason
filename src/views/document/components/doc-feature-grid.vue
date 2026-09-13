<script setup lang="ts">
const features = [
  {
    title: '开箱即用',
    desc: '内置常用业务组件与页面能力，便于快速搭建管理系统。'
  },
  {
    title: '灵活可定制',
    desc: '支持多种布局与主题配置，适配不同项目需求。'
  },
  {
    title: '结构清晰',
    desc: '目录分层明确，配套文档齐全，降低上手成本。'
  },
  {
    title: '持续维护',
    desc: '按实际使用反馈迭代功能、约定与文档。'
  }
]
</script>

<template>
  <div class="feature-grid">
    <article v-for="item in features" :key="item.title" class="feature-card">
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
  min-height: 120px;
  padding: 20px 18px;
  background: color-mix(in srgb, var(--bg-surface) 86%, var(--fill-primary));
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
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
