<template>
  <div class="card mb10" v-loading="loading">
    <div class="card-head mb10">
      <div class="card-title">待办任务</div>
      <div class="muted">{{ todos.length ? `共 ${todos.length} 项` : '今日待办' }}</div>
    </div>

    <el-alert v-if="error" type="error" show-icon :closable="false" :title="error" class="mb10">
      <template #default>
        <el-button type="primary" link @click="$emit('retry')" aria-label="重试加载待办"
          >重试</el-button
        >
      </template>
    </el-alert>

    <el-empty v-else-if="!loading && todos.length === 0" description="暂无待办" />

    <el-table v-else :data="todos" size="small" style="width: 100%">
      <el-table-column prop="title" label="任务" min-width="160" show-overflow-tooltip />
      <el-table-column label="优先级" width="90">
        <template #default="{ row }">
          <el-tag size="small" :type="priorityTagType(row.priority)">
            {{ priorityText(row.priority) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="dueAt" label="截止" width="160" />
      <el-table-column label="状态" width="90">
        <template #default="{ row }">
          <el-tag size="small" :type="statusTagType(row.status)">
            {{ statusText(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" fixed="right" align="center">
        <template #default="{ row }">
          <el-button
            type="primary"
            link
            :disabled="row.status === 'done'"
            aria-label="标记完成"
            @click="$emit('markDone', row.id)"
          >
            完成
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import type { TodoItem, TodoPriority, TodoStatus } from '@/api/interface/dashboard'

defineProps<{
  todos: TodoItem[]
  loading: boolean
  error: string
}>()

defineEmits<{
  (e: 'retry'): void
  (e: 'markDone', id: string): void
}>()

function priorityText(p: TodoPriority) {
  if (p === 'high') return '高'
  if (p === 'medium') return '中'
  return '低'
}

function priorityTagType(p: TodoPriority) {
  if (p === 'high') return 'danger'
  if (p === 'medium') return 'warning'
  return 'info'
}

function statusText(s: TodoStatus) {
  if (s === 'todo') return '待办'
  if (s === 'doing') return '进行中'
  return '已完成'
}

function statusTagType(s: TodoStatus) {
  if (s === 'todo') return 'info'
  if (s === 'doing') return 'warning'
  return 'success'
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
</style>
