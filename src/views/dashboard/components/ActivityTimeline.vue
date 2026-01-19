<template>
  <div class="card mb10" v-loading="loading">
    <div class="card-head mb10">
      <div class="card-title">最近动态</div>
      <div class="muted">系统操作与告警</div>
    </div>

    <el-alert v-if="error" type="error" show-icon :closable="false" :title="error" class="mb10">
      <template #default>
        <el-button type="primary" link @click="$emit('retry')" aria-label="重试加载动态"
          >重试</el-button
        >
      </template>
    </el-alert>

    <el-empty v-else-if="!loading && activities.length === 0" description="暂无动态" />

    <el-timeline v-else>
      <el-timeline-item
        v-for="item in activities"
        :key="item.id"
        :timestamp="item.at"
        :type="activityTimelineType(item.level)"
      >
        <span class="activity-actor">{{ item.actor }}</span>
        <span class="muted"> {{ item.action }} </span>
        <span class="activity-target">{{ item.target }}</span>
      </el-timeline-item>
    </el-timeline>

    <div class="flex justify-end mt10">
      <el-button type="primary" link aria-label="查看更多动态" @click="$emit('more')">
        查看更多
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ActivityLevel } from '@/api/interface/dashboard'

defineProps<{
  activities: any[]
  loading: boolean
  error: string
}>()

defineEmits<{
  (e: 'retry'): void
  (e: 'more'): void
}>()

function activityTimelineType(level: ActivityLevel) {
  if (level === 'success') return 'success'
  if (level === 'warning') return 'warning'
  if (level === 'danger') return 'danger'
  return 'primary'
}
</script>

<style scoped>
.card-head {
  display: flex;
  gap: 12px;
  align-items: baseline;
  justify-content: space-between;

  .card-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
}

.muted {
  color: var(--el-text-color-secondary);
}

.activity-actor,
.activity-target {
  font-weight: 600;
  color: var(--el-text-color-primary);
}
</style>
