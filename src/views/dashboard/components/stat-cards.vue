<script setup lang="ts">
import { computed } from 'vue'
import type { DashboardSummary, SystemHealth } from '@/api/interface/dashboard'

const props = defineProps<{
  summary: DashboardSummary | null
  health: SystemHealth | null
}>()

const formatNumber = (n?: number) => {
  if (n == null) return '—'
  return n.toLocaleString('en-US')
}

const formatDelta = (n?: number) => {
  if (n == null) return ''
  const sign = n > 0 ? '+' : ''
  return `${sign}${Math.round(n)}%`
}

const cards = computed(() => {
  const s = props.summary
  const h = props.health
  return [
    {
      key: 'visits',
      label: 'Total Visitors',
      value: formatNumber(s?.visits),
      delta: formatDelta(s?.visitsDelta),
      tone: 'green' as const,
      bars: [40, 55, 48, 70, 62, 78, 85]
    },
    {
      key: 'active',
      label: 'Active Users',
      value: formatNumber(s?.activeUsers),
      delta: formatDelta(s?.activeUsersDelta),
      tone: 'blue' as const,
      bars: [35, 42, 58, 50, 66, 60, 72]
    },
    {
      key: 'feedback',
      label: 'New Feedback',
      value: formatNumber(s?.pendingTodos),
      delta: formatDelta(s?.pendingTodosDelta),
      tone: 'purple' as const,
      bars: [28, 36, 44, 52, 48, 64, 70]
    },
    {
      key: 'status',
      label: 'System Status',
      value: h?.status === 'healthy' ? 'Healthy' : h?.status === 'warning' ? 'Warning' : '—',
      delta: '',
      tone: 'status' as const,
      bars: [] as number[],
      hint: h?.status === 'healthy' ? 'All systems operational.' : 'Needs attention.'
    }
  ]
})
</script>

<template>
  <div class="stat-grid">
    <article v-for="card in cards" :key="card.key" class="stat-card" :data-tone="card.tone">
      <div class="stat-head">
        <span class="label">{{ card.label }}</span>
        <span v-if="card.delta" class="delta">↑ {{ card.delta }}</span>
        <span v-else-if="card.tone === 'status'" class="status-dot" />
      </div>
      <div class="stat-body">
        <strong class="value">{{ card.value }}</strong>
        <div v-if="card.bars.length" class="spark" aria-hidden="true">
          <span v-for="(h, i) in card.bars" :key="i" :style="{ height: `${h}%` }" />
        </div>
        <p v-else class="hint">{{ card.hint }}</p>
      </div>
    </article>
  </div>
</template>

<style scoped>
.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.stat-card {
  padding: 20px 22px;
  background: var(--bg-surface);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
}

.stat-head {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 14px;
}

.label {
  font-size: 13px;
  color: var(--text-tertiary);
}

.delta {
  margin-left: auto;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-success);
}

.status-dot {
  width: 8px;
  height: 8px;
  margin-left: auto;
  background: var(--color-success);
  border-radius: var(--radius-full);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-success) 18%, transparent);
}

.stat-body {
  display: flex;
  gap: 12px;
  align-items: flex-end;
  justify-content: space-between;
}

.value {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.hint {
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
  color: var(--text-tertiary);
  text-align: right;
}

.spark {
  display: flex;
  gap: 3px;
  align-items: flex-end;
  height: 36px;
}

.spark span {
  width: 5px;
  border-radius: 2px 2px 0 0;
}

.stat-card[data-tone='green'] .spark span {
  background: color-mix(in srgb, var(--color-success) 75%, white);
}

.stat-card[data-tone='blue'] .spark span {
  background: color-mix(in srgb, #5b8def 75%, white);
}

.stat-card[data-tone='purple'] .spark span {
  background: color-mix(in srgb, #8b7cf6 75%, white);
}

@media (width <= 1100px) {
  .stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (width <= 640px) {
  .stat-grid {
    grid-template-columns: 1fr;
  }
}
</style>
