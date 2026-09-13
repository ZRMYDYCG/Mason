<script setup lang="ts">
import { computed } from 'vue'
import type { ActivityItem } from '@/api/interface/dashboard'
import AppIcon from '@/components/AppIcon/index.vue'

const props = defineProps<{
  activities: ActivityItem[]
}>()

const iconMap: Record<string, { icon: string; tone: string }> = {
  success: { icon: 'sparkles', tone: 'green' },
  info: { icon: 'layers', tone: 'blue' },
  warning: { icon: 'triangle-alert', tone: 'amber' },
  danger: { icon: 'circle-alert', tone: 'red' }
}

const relativeTime = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime()
  const hour = 60 * 60 * 1000
  const day = 24 * hour
  if (diff < hour) return `${Math.max(1, Math.round(diff / (60 * 1000)))}m ago`
  if (diff < day) return `${Math.round(diff / hour)}h ago`
  return `${Math.round(diff / day)}d ago`
}

const items = computed(() =>
  props.activities.map((item) => ({
    ...item,
    meta: iconMap[item.level] || iconMap.info,
    time: relativeTime(item.at)
  }))
)
</script>

<template>
  <section class="panel updates">
    <header class="panel-head">
      <h3>Latest Updates</h3>
      <button type="button" class="link">View All</button>
    </header>
    <ul class="list">
      <li v-for="item in items" :key="item.id">
        <span class="icon" :data-tone="item.meta.tone">
          <AppIcon :name="item.meta.icon" :size="15" />
        </span>
        <div class="body">
          <p>{{ item.target }}</p>
          <time>{{ item.time }}</time>
        </div>
      </li>
    </ul>
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

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.panel-head h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 650;
  color: var(--text-primary);
}

.link {
  padding: 0;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  background: none;
  border: none;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.list li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.icon {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
}

.icon[data-tone='green'] {
  color: #3f8f3a;
  background: color-mix(in srgb, #7ac943 18%, transparent);
}

.icon[data-tone='blue'] {
  color: #3d6fd8;
  background: color-mix(in srgb, #5b8def 18%, transparent);
}

.icon[data-tone='amber'] {
  color: #b8860b;
  background: color-mix(in srgb, #f5b942 18%, transparent);
}

.icon[data-tone='red'] {
  color: #c44;
  background: color-mix(in srgb, #ef5b5b 18%, transparent);
}

.body p {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 550;
  line-height: 1.4;
  color: var(--text-primary);
}

.body time {
  font-size: 12px;
  color: var(--text-tertiary);
}
</style>
