<template>
  <el-row :gutter="12" class="mb10 kpi-row">
    <el-col v-for="item in cardsView" :key="item.key" :xs="24" :sm="12" :lg="6">
      <div
        class="card kpi-card"
        :class="{ clickable: !!item.to }"
        role="button"
        tabindex="0"
        @click="handleClick(item.to)"
        @keydown.enter="handleClick(item.to)"
      >
        <div class="kpi-top">
          <div class="kpi-label">{{ item.label }}</div>
          <el-tag
            v-if="item.delta !== null"
            size="small"
            :type="item.delta >= 0 ? 'success' : 'danger'"
          >
            {{ formatDelta(item.delta) }}
          </el-tag>
        </div>
        <div class="kpi-value">
          <el-skeleton :loading="loading" animated>
            <template #template>
              <el-skeleton-item variant="h1" style="width: 120px" />
            </template>
            <template #default>
              <AnimatedNumber
                v-if="item.parsedValue.num !== null"
                :value="item.parsedValue.num!"
                :decimals="item.parsedValue.decimals"
                :suffix="item.parsedValue.suffix"
              />
              <template v-else>
                {{ item.value }}
              </template>
            </template>
          </el-skeleton>
        </div>
        <div class="kpi-chart" v-if="item.spark.length">
          <el-skeleton :loading="loading" animated>
            <template #template>
              <el-skeleton-item variant="image" style="height: 36px" />
            </template>
            <template #default>
              <v-chart class="chart" :option="sparkOption(item.key, item.spark)" autoresize />
            </template>
          </el-skeleton>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { CountUp } from 'countup.js'
import { useSettingStore } from '@/store/modules/setting'

export type KpiCard = {
  key: string
  label: string
  value: string | number
  delta: number | null
  spark: number[]
  to?: string
}

const props = defineProps<{
  cards: KpiCard[]
  loading: boolean
}>()

const router = useRouter()
const settingStore = useSettingStore()

type SparkPalette = {
  primary: string
  success: string
  warning: string
  danger: string
}

const palette = ref<SparkPalette>({
  primary: '#409EFF',
  success: '#67C23A',
  warning: '#E6A23C',
  danger: '#F56C6C'
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
    danger: resolveCssColor('--el-color-danger', palette.value.danger)
  }
}

function toRgba(color: string, alpha: number) {
  const raw = color.trim()
  if (raw.startsWith('rgba(')) {
    const inner = raw.slice(5, -1)
    const parts = inner.split(',').map((s) => s.trim())
    if (parts.length >= 3) {
      return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`
    }
    return raw
  }
  if (raw.startsWith('rgb(')) {
    const inner = raw.slice(4, -1)
    const parts = inner.split(',').map((s) => s.trim())
    if (parts.length >= 3) {
      return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`
    }
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

function handleClick(to?: string) {
  if (!to) return
  router.push(to).catch(() => {
    ElMessage.info('目标页面暂未配置或无权限访问')
  })
}

function formatDelta(val: number) {
  const sign = val >= 0 ? '+' : ''
  return `${sign}${val.toFixed(1)}%`
}

type ParsedValue = {
  num: number | null
  decimals: number
  suffix: string
}

function getParsedValue(val: string | number): ParsedValue {
  if (typeof val === 'number' && Number.isFinite(val)) {
    return { num: val, decimals: 0, suffix: '' }
  }
  if (typeof val !== 'string') return { num: null, decimals: 0, suffix: '' }

  const raw = val.trim()
  if (!raw) return { num: null, decimals: 0, suffix: '' }

  const isPercent = raw.endsWith('%')
  const suffix = isPercent ? '%' : ''
  const numericPart = isPercent ? raw.slice(0, -1) : raw
  const sanitized = numericPart.replace(/,/g, '')

  const num = Number.parseFloat(sanitized)
  if (!Number.isFinite(num)) return { num: null, decimals: 0, suffix: '' }

  const dotIdx = sanitized.indexOf('.')
  const decimals = dotIdx === -1 ? 0 : Math.max(0, sanitized.length - dotIdx - 1)
  return { num, decimals, suffix }
}

const cardsView = computed(() =>
  props.cards.map((c) => ({
    ...c,
    parsedValue: getParsedValue(c.value)
  }))
)

const sparkColor = (key: string) => {
  if (key === 'visits') return palette.value.primary
  if (key === 'activeUsers') return palette.value.success
  if (key === 'pendingTodos') return palette.value.warning
  if (key === 'errorRate') return palette.value.danger
  return palette.value.primary
}

function sparkOption(key: string, values: number[]) {
  const color = sparkColor(key)
  const baseOption = {
    animation: true,
    grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: false },
    tooltip: { show: false },
    xAxis: { type: 'category', show: false, data: values.map((_, idx) => idx) },
    yAxis: { type: 'value', show: false }
  }

  // 访问量：平滑面积图
  if (key === 'visits') {
    const area = toRgba(color, 0.18)
    return {
      ...baseOption,
      series: [
        {
          type: 'line',
          data: values,
          smooth: true,
          symbol: 'none',
          silent: true,
          lineStyle: { width: 2, color },
          areaStyle: { opacity: 1, color: area }
        }
      ]
    }
  }

  // 活跃用户：柱状图
  if (key === 'activeUsers') {
    return {
      ...baseOption,
      series: [
        {
          type: 'bar',
          data: values,
          barWidth: '55%',
          itemStyle: { color, borderRadius: [2, 2, 0, 0] },
          silent: true
        }
      ]
    }
  }

  // 待办事项：阶梯线图 (体现任务的阶段性)
  if (key === 'pendingTodos') {
    const area = toRgba(color, 0.1)
    return {
      ...baseOption,
      series: [
        {
          type: 'line',
          step: 'middle',
          data: values,
          symbol: 'none',
          silent: true,
          lineStyle: { width: 2, color },
          areaStyle: { opacity: 1, color: area }
        }
      ]
    }
  }

  // 错误率：尖锐面积图 (体现波动的突兀感)
  if (key === 'errorRate') {
    const area = toRgba(color, 0.18)
    return {
      ...baseOption,
      series: [
        {
          type: 'line',
          data: values,
          smooth: false,
          symbol: 'none',
          silent: true,
          lineStyle: { width: 2, color },
          areaStyle: { opacity: 1, color: area }
        }
      ]
    }
  }

  // 默认：平滑面积图
  const area = toRgba(color, 0.18)
  return {
    ...baseOption,
    series: [
      {
        type: 'line',
        data: values,
        smooth: true,
        symbol: 'none',
        silent: true,
        lineStyle: { width: 2, color },
        areaStyle: { opacity: 1, color: area }
      }
    ]
  }
}

const AnimatedNumber = defineComponent({
  props: {
    value: { type: Number, required: true },
    decimals: { type: Number, default: 0 },
    suffix: { type: String, default: '' }
  },
  setup(props) {
    const elRef = ref<HTMLElement>()
    const instance = ref<CountUp>()

    const options = computed(() => ({
      decimalPlaces: props.decimals,
      separator: ',',
      suffix: props.suffix,
      duration: 1.2
    }))

    const init = () => {
      if (!elRef.value) return
      instance.value = new CountUp(elRef.value, props.value, {
        startVal: 0,
        ...options.value
      })
      if (instance.value.error) return
      instance.value.start()
    }

    onMounted(init)

    watch(
      () => [props.value, props.decimals, props.suffix] as const,
      (next, prev) => {
        if (!instance.value) {
          init()
          return
        }
        if (prev && (next[1] !== prev[1] || next[2] !== prev[2])) {
          init()
          return
        }
        instance.value.update(next[0])
      }
    )

    onUnmounted(() => {
      instance.value?.reset()
    })

    return () => h('span', { ref: elRef })
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

<style scoped>
.kpi-row {
  @media screen and (width <= 768px) {
    row-gap: 12px;
  }
}

.kpi-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 136px;
  overflow: hidden;
  user-select: none;

  &.clickable {
    cursor: pointer;
  }

  .kpi-top {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
  }

  .kpi-label {
    font-size: 13px;
    color: var(--el-text-color-regular);
  }

  .kpi-value {
    margin-top: 6px;
    font-size: 26px;
    font-weight: 700;
    line-height: 1.1;
    color: var(--el-text-color-primary);
  }

  .kpi-chart {
    height: 36px;
    margin-top: 10px;

    .chart {
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  }
}
</style>
