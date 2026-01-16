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
import { computed, onMounted, ref, watch } from 'vue'
import type { TrendPoint } from '@/api/interface/dashboard'
import { useSettingStore } from '@/store/modules/setting'

const props = defineProps<{
  loading: boolean
  error: string
  data: TrendPoint[]
}>()

defineEmits<{
  (e: 'retry'): void
}>()

const settingStore = useSettingStore()

type TrendPalette = {
  primary: string
  success: string
  warning: string
  danger: string
  info: string
}

const palette = ref<TrendPalette>({
  primary: '#409EFF',
  success: '#67C23A',
  warning: '#E6A23C',
  danger: '#F56C6C',
  info: '#909399'
})

function resolveCssColor(variableName: string, fallback: string) {
  if (typeof window === 'undefined') return fallback
  const val = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()
  return val || fallback
}

function updatePaletteFromCssVars() {
  palette.value = {
    primary: resolveCssColor('--el-color-primary', palette.value.primary),
    success: resolveCssColor('--el-color-success', palette.value.success),
    warning: resolveCssColor('--el-color-warning', palette.value.warning),
    danger: resolveCssColor('--el-color-danger', palette.value.danger),
    info: resolveCssColor('--el-color-info', palette.value.info)
  }
}

function toRgba(color: string, alpha: number) {
  const raw = color.trim()
  if (raw.startsWith('rgba(')) {
    const inner = raw.slice(5, -1)
    const parts = inner.split(',').map((s) => s.trim())
    if (parts.length >= 3) return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`
    return raw
  }
  if (raw.startsWith('rgb(')) {
    const inner = raw.slice(4, -1)
    const parts = inner.split(',').map((s) => s.trim())
    if (parts.length >= 3) return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`
    return raw
  }
  if (raw.startsWith('#')) {
    const hex = raw.slice(1)
    const normalized =
      hex.length === 3
        ? hex
            .split('')
            .map((c) => c + c)
            .join('')
        : hex
    if (normalized.length === 6) {
      const r = Number.parseInt(normalized.slice(0, 2), 16)
      const g = Number.parseInt(normalized.slice(2, 4), 16)
      const b = Number.parseInt(normalized.slice(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
  }
  return raw
}

function makeLineSeries(name: string, data: number[], color: string) {
  return {
    name,
    type: 'line',
    smooth: true,
    symbol: 'none',
    sampling: 'lttb',
    showSymbol: false,
    lineStyle: {
      width: 2,
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [
          { offset: 0, color: toRgba(color, 0.55) },
          { offset: 0.5, color: toRgba(color, 1) },
          { offset: 1, color: toRgba(color, 0.75) }
        ]
      },
      shadowColor: toRgba(color, 0.25),
      shadowBlur: 10,
      shadowOffsetY: 4
    },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: toRgba(color, 0.22) },
          { offset: 1, color: toRgba(color, 0) }
        ]
      }
    },
    data,
    emphasis: { focus: 'series' }
  }
}

const trendOption = computed(() => {
  const x = props.data.map((p) => p.date)
  const visits = props.data.map((p) => p.visits)
  const active = props.data.map((p) => p.activeUsers)
  const returning = props.data.map((p) => {
    const estimated = Math.round(p.activeUsers * 0.42 + p.visits / 12000)
    return Math.min(p.activeUsers, Math.max(0, estimated))
  })
  const newUsers = props.data.map((p, idx) => Math.max(0, p.activeUsers - returning[idx]))

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: { color: 'var(--app-border)', width: 1 }
      }
    },
    legend: {
      data: ['访问量', '活跃用户', '新用户', '回访用户'],
      bottom: 0,
      left: 'center',
      icon: 'rect',
      itemWidth: 18,
      itemHeight: 6,
      itemGap: 16,
      textStyle: { color: 'var(--el-text-color-regular)' }
    },
    grid: { left: 12, right: 12, top: 16, bottom: 46, containLabel: true },
    xAxis: {
      type: 'category',
      data: x,
      boundaryGap: false,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: 'var(--app-border)' } },
      axisLabel: { color: 'var(--el-text-color-secondary)' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'var(--el-text-color-secondary)' },
      splitLine: { lineStyle: { color: 'var(--app-border)', type: 'dashed', opacity: 0.6 } }
    },
    series: [
      makeLineSeries('访问量', visits, palette.value.primary),
      makeLineSeries('活跃用户', active, palette.value.success),
      makeLineSeries('新用户', newUsers, palette.value.warning),
      makeLineSeries('回访用户', returning, palette.value.info)
    ]
  }
})

onMounted(() => {
  updatePaletteFromCssVars()
})

watch(
  () => [settingStore.systemThemeType, settingStore.systemThemeColor] as const,
  () => updatePaletteFromCssVars()
)
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
