<template>
  <div class="card" v-loading="loading">
    <div class="card-head mb10">
      <div class="card-title">系统状态</div>
      <div class="muted">资源与服务健康度</div>
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
        <el-button type="primary" link @click="$emit('retry')" aria-label="重试加载系统状态"
          >重试</el-button
        >
      </template>
    </el-alert>

    <template v-else>
      <div class="health-row">
        <div class="health-label">CPU</div>
        <el-progress :percentage="health.cpu" :stroke-width="10" />
      </div>
      <div class="health-row">
        <div class="health-label">内存</div>
        <el-progress :percentage="health.memory" :stroke-width="10" />
      </div>
      <div class="health-row">
        <div class="health-label">磁盘</div>
        <el-progress :percentage="health.disk" :stroke-width="10" />
      </div>

      <div class="health-meta">
        <div class="health-meta-left">
          <div class="muted">版本：{{ health.version || '-' }}</div>
          <div class="muted">构建：{{ health.buildTime || '-' }}</div>
        </div>
        <el-tag :type="healthStatusTagType(health.status)">
          {{ healthStatusText(health.status) }}
        </el-tag>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { SystemHealth } from '@/api/interface/dashboard'

defineProps<{
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

.health-row {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 10px;
  align-items: center;
  margin-bottom: 12px;

  .health-label {
    font-size: 13px;
    color: var(--el-text-color-regular);
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
