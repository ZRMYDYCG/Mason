<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import type { TrendPoint } from '@/api/interface/dashboard'
import { useECharts } from '@/hooks/useEcharts'

const props = defineProps<{
  data: TrendPoint[]
}>()

const chartRef = ref<HTMLDivElement>()
const { setOptions } = useECharts(chartRef as any)

const cssVar = (name: string, fallback: string) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

const renderChart = () => {
  const labels = props.data.map((d) => d.label || d.date.slice(5))
  const visits = props.data.map((d) => d.visits)
  const active = props.data.map((d) => d.activeUsers)
  const textMuted = cssVar('--text-tertiary', '#8c8c8c')
  const textPrimary = cssVar('--text-primary', '#1f1f1f')
  const border = cssVar('--border-light', '#ececec')
  const subtle = cssVar('--border-subtle', '#f2f2f2')
  const surface = cssVar('--bg-surface-elevated', '#fff')

  setOptions({
    color: ['#7ac943', '#5b8def'],
    legend: {
      top: 0,
      right: 0,
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { color: textMuted, fontSize: 12 }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: surface,
      borderColor: border,
      textStyle: { color: textPrimary, fontSize: 12 },
      extraCssText: 'box-shadow: 0 8px 24px rgba(0,0,0,.08); border-radius: 10px;'
    },
    grid: { left: 8, right: 12, top: 36, bottom: 8, containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: labels,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: border } },
      axisLabel: { color: textMuted, fontSize: 11 },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      splitNumber: 4,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { color: textMuted, fontSize: 11 },
      splitLine: { lineStyle: { color: subtle, type: 'dashed' } }
    },
    series: [
      {
        name: 'Visitors',
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 2.5 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(122, 201, 67, 0.22)' },
              { offset: 1, color: 'rgba(122, 201, 67, 0)' }
            ]
          }
        },
        data: visits
      },
      {
        name: 'Active Users',
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 2.5 },
        data: active
      }
    ]
  })
}

onMounted(async () => {
  await nextTick()
  if (props.data.length) renderChart()
})

watch(
  () => props.data,
  async () => {
    await nextTick()
    if (props.data.length) renderChart()
  },
  { deep: true }
)
</script>

<template>
  <section class="panel growth">
    <header class="panel-head">
      <h3>Growth Overview</h3>
      <span class="range">This Year</span>
    </header>
    <div ref="chartRef" class="chart" />
  </section>
</template>

<style scoped>
.panel {
  height: 100%;
  padding: 22px 22px 16px;
  background: var(--bg-surface);
  border: var(--box-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--box-shadow);
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.panel-head h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 650;
  color: var(--text-primary);
}

.range {
  padding: 6px 12px;
  font-size: 12px;
  color: var(--text-secondary);
  background: var(--fill-primary);
  border-radius: var(--radius-full);
}

.chart {
  width: 100%;
  height: 260px;
}
</style>
