<template>
  <div class="card mb10" v-loading="loading">
    <div class="card-head">
      <div class="card-title">趋势</div>
      <div class="muted">访问量 & 活跃用户</div>
    </div>

    <el-alert
      v-if="error"
      type="error"
      show-icon
      :closable="false"
      :title="error"
      class="mb10"
    >
      <template #default>
        <el-button type="primary" link @click="$emit('retry')" aria-label="重试加载趋势"
          >重试</el-button
        >
      </template>
    </el-alert>

    <el-empty v-else-if="!loading && data.length === 0" description="暂无数据" />

    <div v-else class="trend-chart">
      <v-chart class="chart" :option="trendOption" autoresize />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TrendPoint } from '@/api/interface/dashboard'

const props = defineProps<{
  loading: boolean
  error: string
  data: TrendPoint[]
}>()

defineEmits<{
  (e: 'retry'): void
}>()

const trendOption = computed(() => {
  const x = props.data.map((p) => p.date)
  const visits = props.data.map((p) => p.visits)
  const active = props.data.map((p) => p.activeUsers)

  return {
    tooltip: { trigger: 'axis' },
    legend: { data: ['访问量', '活跃用户'] },
    grid: { left: 12, right: 12, top: 36, bottom: 12, containLabel: true },
    xAxis: {
      type: 'category',
      data: x,
      axisTick: { show: false }
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: '访问量',
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: visits,
        areaStyle: { opacity: 0.08 }
      },
      {
        name: '活跃用户',
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: active,
        areaStyle: { opacity: 0.06 }
      }
    ]
  }
})
</script>

<style scoped lang="scss">
.card-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;

  .card-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
}

.muted {
  color: var(--el-text-color-secondary);
}

.trend-chart {
  height: 320px;

  .chart {
    height: 100%;
    width: 100%;
  }
}
</style>
