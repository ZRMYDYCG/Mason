<template>
  <div class="dashboard-page">
    <DashboardHeader
      v-model:range-preset="rangePreset"
      v-model:custom-range="customRange"
      :loading="refreshing"
      @refresh="refreshAll"
      @change="onRangeChange"
    />

    <el-alert
      v-if="pageError"
      class="mb10"
      type="error"
      show-icon
      :closable="false"
      :title="pageError"
    >
      <template #default>
        <el-button type="primary" link @click="refreshAll" aria-label="重试加载">重试</el-button>
      </template>
    </el-alert>

    <KpiCards :cards="kpiCards" :loading="summaryLoading" />

    <el-row :gutter="12">
      <el-col :xs="24" :lg="16">
        <TrendChart
          :loading="trendLoading"
          :error="trendError"
          :data="trendData"
          @retry="fetchTrend"
        />

        <NoticeList :notices="notices" />
      </el-col>

      <el-col :xs="24" :lg="8">
        <TodoList
          :todos="todos"
          :loading="todosLoading"
          :error="todosError"
          @retry="fetchTodos"
          @mark-done="markTodoDone"
        />

        <ActivityTimeline
          :activities="activities"
          :loading="activitiesLoading"
          :error="activitiesError"
          @retry="fetchActivities"
          @more="handleMoreActivities"
        />

        <SystemHealthCard
          :health="health"
          :loading="healthLoading"
          :error="healthError"
          @retry="fetchHealth"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { useDebounceFn } from '@vueuse/core'
import {
  getDashboardActivities,
  getDashboardSummary,
  getDashboardSystemHealth,
  getDashboardTodos,
  getDashboardTrend
} from '@/api/modules/dashboard'
import type {
  DashboardRangeParams,
  DashboardRangePreset,
  DashboardSummary,
  SystemHealth,
  TodoItem,
  TrendPoint
} from '@/api/interface/dashboard'

import DashboardHeader from './components/DashboardHeader.vue'
import KpiCards, { type KpiCard } from './components/KpiCards.vue'
import TrendChart from './components/TrendChart.vue'
import NoticeList, { type NoticeItem } from './components/NoticeList.vue'
import TodoList from './components/TodoList.vue'
import ActivityTimeline from './components/ActivityTimeline.vue'
import SystemHealthCard from './components/SystemHealth.vue'

// Re-using the state logic
const rangePreset = ref<DashboardRangePreset>('7d')
const customRange = ref<[string, string] | null>(null)

const summaryLoading = ref(false)
const trendLoading = ref(false)
const todosLoading = ref(false)
const activitiesLoading = ref(false)
const healthLoading = ref(false)
const refreshing = ref(false)

const pageError = ref<string>('')
const summaryError = ref<string>('')
const trendError = ref<string>('')
const todosError = ref<string>('')
const activitiesError = ref<string>('')
const healthError = ref<string>('')

const summary = ref<DashboardSummary>({
  visits: 0,
  visitsDelta: 0,
  activeUsers: 0,
  activeUsersDelta: 0,
  pendingTodos: 0,
  pendingTodosDelta: 0,
  errorRate: 0,
  errorRateDelta: 0
})
const trendData = ref<TrendPoint[]>([])
const todos = ref<TodoItem[]>([])
const activities = ref<any[]>([])
const health = ref<SystemHealth>({
  cpu: 0,
  memory: 0,
  disk: 0,
  status: 'healthy',
  version: '',
  buildTime: ''
})

const notices = ref<NoticeItem[]>([
  {
    id: '1',
    title: '系统维护通知：本周六凌晨进行服务器升级',
    tag: '重要',
    type: 'danger',
    date: '2024-03-20',
    link: '#'
  },
  {
    id: '2',
    title: '新功能上线：AI 智能助手正式发布',
    tag: '新功能',
    type: 'success',
    date: '2024-03-18',
    link: '#'
  },
  {
    id: '3',
    title: '关于加强数据安全管理的规范更新',
    tag: '通知',
    type: 'info',
    date: '2024-03-15',
    link: '#'
  },
  {
    id: '4',
    title: '3月份员工满意度调查问卷',
    tag: '活动',
    type: 'warning',
    date: '2024-03-10',
    link: '#'
  }
])

const kpiCards = computed<KpiCard[]>(() => {
  const sparkVisits = trendData.value.map((p) => p.visits).slice(-14)
  const sparkActive = trendData.value.map((p) => p.activeUsers).slice(-14)
  const pendingSpark = trendData.value.map((p) => Math.round(p.activeUsers / 180)).slice(-14)
  const errorSpark = trendData.value
    .map((p) => Math.max(0, Math.round((p.visits / 120000) * 100)))
    .slice(-14)

  return [
    {
      key: 'visits',
      label: '访问量',
      value: formatNumber(summary.value.visits),
      delta: summary.value.visitsDelta,
      spark: sparkVisits,
      to: '/system/log'
    },
    {
      key: 'activeUsers',
      label: '活跃用户',
      value: formatNumber(summary.value.activeUsers),
      delta: summary.value.activeUsersDelta,
      spark: sparkActive,
      to: '/system/accountManage'
    },
    {
      key: 'pendingTodos',
      label: '待处理任务',
      value: formatNumber(summary.value.pendingTodos),
      delta: summary.value.pendingTodosDelta,
      spark: pendingSpark
    },
    {
      key: 'errorRate',
      label: '错误率',
      value: `${summary.value.errorRate.toFixed(2)}%`,
      delta: summary.value.errorRateDelta,
      spark: errorSpark
    }
  ]
})

function formatNumber(val: number) {
  return new Intl.NumberFormat('zh-CN').format(val)
}

function currentRangeParams(): DashboardRangeParams {
  const today = dayjs()

  if (rangePreset.value === 'custom' && customRange.value) {
    return { startDate: customRange.value[0], endDate: customRange.value[1] }
  }

  if (rangePreset.value === '30d') {
    return {
      startDate: today.subtract(29, 'day').format('YYYY-MM-DD'),
      endDate: today.format('YYYY-MM-DD')
    }
  }

  if (rangePreset.value === 'month') {
    return {
      startDate: today.startOf('month').format('YYYY-MM-DD'),
      endDate: today.endOf('month').format('YYYY-MM-DD')
    }
  }

  return {
    startDate: today.subtract(6, 'day').format('YYYY-MM-DD'),
    endDate: today.format('YYYY-MM-DD')
  }
}

async function fetchSummary() {
  summaryError.value = ''
  summaryLoading.value = true
  try {
    const res = await getDashboardSummary(currentRangeParams())
    if (res.code !== 200) throw new Error(res.msg || '获取指标失败')
    summary.value = res.data
  } catch (e) {
    summaryError.value = (e as Error).message || '获取指标失败'
  } finally {
    summaryLoading.value = false
  }
}

async function fetchTrend() {
  trendError.value = ''
  trendLoading.value = true
  try {
    const res = await getDashboardTrend(currentRangeParams())
    if (res.code !== 200) throw new Error(res.msg || '获取趋势失败')
    trendData.value = res.data || []
  } catch (e) {
    trendError.value = (e as Error).message || '获取趋势失败'
    trendData.value = []
  } finally {
    trendLoading.value = false
  }
}

async function fetchTodos() {
  todosError.value = ''
  todosLoading.value = true
  try {
    const res = await getDashboardTodos()
    if (res.code !== 200) throw new Error(res.msg || '获取待办失败')
    todos.value = res.data || []
  } catch (e) {
    todosError.value = (e as Error).message || '获取待办失败'
    todos.value = []
  } finally {
    todosLoading.value = false
  }
}

async function fetchActivities() {
  activitiesError.value = ''
  activitiesLoading.value = true
  try {
    const res = await getDashboardActivities()
    if (res.code !== 200) throw new Error(res.msg || '获取动态失败')
    activities.value = res.data || []
  } catch (e) {
    activitiesError.value = (e as Error).message || '获取动态失败'
    activities.value = []
  } finally {
    activitiesLoading.value = false
  }
}

async function fetchHealth() {
  healthError.value = ''
  healthLoading.value = true
  try {
    const res = await getDashboardSystemHealth()
    if (res.code !== 200) throw new Error(res.msg || '获取系统状态失败')
    health.value = res.data
  } catch (e) {
    healthError.value = (e as Error).message || '获取系统状态失败'
  } finally {
    healthLoading.value = false
  }
}

const fetchTrendDebounced = useDebounceFn(() => {
  fetchSummary()
  fetchTrend()
}, 250)

function onRangeChange() {
  fetchTrendDebounced()
}

async function refreshAll() {
  pageError.value = ''
  refreshing.value = true
  try {
    await Promise.all([
      fetchSummary(),
      fetchTrend(),
      fetchTodos(),
      fetchActivities(),
      fetchHealth()
    ])
    if (
      summaryError.value ||
      trendError.value ||
      todosError.value ||
      activitiesError.value ||
      healthError.value
    ) {
      pageError.value = '部分模块加载失败，请稍后重试'
    }
  } catch (e) {
    pageError.value = (e as Error).message || '加载失败'
  } finally {
    refreshing.value = false
  }
}

function markTodoDone(id: string) {
  const idx = todos.value.findIndex((t) => t.id === id)
  if (idx === -1) return
  if (todos.value[idx].status === 'done') return
  todos.value[idx] = { ...todos.value[idx], status: 'done' }
  ElMessage.success('已标记为完成')
}

function handleMoreActivities() {
  ElMessage.info('可在后续接入“系统日志/审计日志”页面')
}

onMounted(() => {
  refreshAll()
})
</script>

<style scoped></style>
