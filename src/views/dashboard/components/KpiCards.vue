<template>
  <el-row :gutter="12" class="mb10">
    <el-col v-for="item in cards" :key="item.key" :xs="24" :sm="12" :lg="6">
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
              {{ item.value }}
            </template>
          </el-skeleton>
        </div>
        <div class="kpi-sparkline" v-if="item.spark.length">
          <svg viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
            <polyline :points="sparkPoints(item.spark)" fill="none" stroke="currentColor" />
          </svg>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export type KpiCard = {
  key: string
  label: string
  value: string
  delta: number | null
  spark: number[]
  to?: string
}

defineProps<{
  cards: KpiCard[]
  loading: boolean
}>()

const router = useRouter()

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

function sparkPoints(values: number[]) {
  if (values.length < 2) return ''
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const stepX = 100 / (values.length - 1)
  return values
    .map((v, idx) => {
      const x = idx * stepX
      const y = 26 - ((v - min) / span) * 24
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
}
</script>

<style scoped lang="scss">
.kpi-card {
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
  overflow: hidden;

  &.clickable {
    cursor: pointer;
  }

  .kpi-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .kpi-label {
    font-size: 13px;
    color: var(--el-text-color-regular);
  }

  .kpi-value {
    margin-top: 6px;
    font-size: 26px;
    font-weight: 700;
    color: var(--el-text-color-primary);
    line-height: 1.1;
  }

  .kpi-sparkline {
    margin-top: 8px;
    height: 26px;
    color: var(--el-color-primary);

    svg {
      width: 100%;
      height: 100%;
    }

    polyline {
      stroke-width: 2;
    }
  }
}
</style>
