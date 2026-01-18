<template>
  <div class="card" v-loading="loading">
    <div class="card-head mb10">
      <div class="card-head-lt">
        <div class="card-title">系统状态</div>
        <div class="muted">资源与服务健康度</div>
      </div>
      <div class="card-head-rt">
        <div class="head-metric">
          <div class="metric-val">{{ avgUsage }}%</div>
          <div class="metric-label muted">综合占用</div>
        </div>
        <el-tag :type="healthStatusTagType(health.status)">
          {{ healthStatusText(health.status) }}
        </el-tag>
      </div>
    </div>

    <el-alert v-if="error" type="error" show-icon :closable="false" :title="error" class="mb10">
      <template #default>
        <el-button type="primary" link @click="$emit('retry')" aria-label="重试加载系统状态"
          >重试</el-button
        >
      </template>
    </el-alert>

    <template v-else>
      <div class="health-row">
        <div class="health-left">
          <div class="health-icon is-primary">
            <AllLucideIcon name="cpu" :size="16" />
          </div>
          <div class="health-left-txt">
            <div class="health-label">CPU</div>
            <div class="health-val">{{ health.cpu }}%</div>
          </div>
        </div>
        <el-progress
          :percentage="health.cpu"
          :stroke-width="8"
          :show-text="false"
          :color="progressColor(health.cpu)"
        />
      </div>
      <div class="health-row">
        <div class="health-left">
          <div class="health-icon is-success">
            <AllLucideIcon name="memory-stick" :size="16" />
          </div>
          <div class="health-left-txt">
            <div class="health-label">内存</div>
            <div class="health-val">{{ health.memory }}%</div>
          </div>
        </div>
        <el-progress
          :percentage="health.memory"
          :stroke-width="8"
          :show-text="false"
          :color="progressColor(health.memory)"
        />
      </div>
      <div class="health-row">
        <div class="health-left">
          <div class="health-icon is-warning">
            <AllLucideIcon name="hard-drive" :size="16" />
          </div>
          <div class="health-left-txt">
            <div class="health-label">磁盘</div>
            <div class="health-val">{{ health.disk }}%</div>
          </div>
        </div>
        <el-progress
          :percentage="health.disk"
          :stroke-width="8"
          :show-text="false"
          :color="progressColor(health.disk)"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SystemHealth } from '@/api/interface/dashboard'

const props = defineProps<{
  health: SystemHealth
  loading: boolean
  error: string
}>()

defineEmits<{
  (e: 'retry'): void
}>()

function healthStatusText(status: SystemHealth['status']) {
  if (status === 'healthy') return '运行正常'
  if (status === 'warning') return '需要关注'
  return '异常'
}

function healthStatusTagType(status: SystemHealth['status']) {
  if (status === 'healthy') return 'success'
  if (status === 'warning') return 'warning'
  return 'danger'
}

const avgUsage = computed(() => {
  const cpu = Number.isFinite(props.health.cpu) ? props.health.cpu : 0
  const memory = Number.isFinite(props.health.memory) ? props.health.memory : 0
  const disk = Number.isFinite(props.health.disk) ? props.health.disk : 0
  return Math.round((cpu + memory + disk) / 3)
})

function progressColor(val: number) {
  if (val >= 85) return 'var(--el-color-danger)'
  if (val >= 70) return 'var(--el-color-warning)'
  return 'var(--el-color-success)'
}
</script>

<style scoped>
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

.card-head-rt {
  display: flex;
  align-items: center;
  gap: 12px;
}

.head-metric {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1.1;

  .metric-val {
    font-size: 14px;
    font-weight: 700;
    color: var(--el-text-color-primary);
  }

  .metric-label {
    font-size: 12px;
  }
}

.muted {
  color: var(--el-text-color-secondary);
}

.health-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
  padding: 10px 10px;
  background: var(--app-bg-overlay);
  border: 1px solid var(--app-border-light);
  border-radius: 10px;

  .health-label {
    font-size: 13px;
    color: var(--el-text-color-regular);
  }

  .health-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .health-icon {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    background: var(--app-fill-light);
    color: var(--el-text-color-primary);

    &.is-primary {
      background: rgba(var(--el-color-primary-rgb), 0.12);
      color: var(--el-color-primary);
    }

    &.is-success {
      background: rgba(var(--el-color-success-rgb), 0.12);
      color: var(--el-color-success);
    }

    &.is-warning {
      background: rgba(var(--el-color-warning-rgb), 0.12);
      color: var(--el-color-warning);
    }
  }

  .health-left-txt {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .health-val {
    font-size: 12px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
}

.health-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 4px;
}
</style>
