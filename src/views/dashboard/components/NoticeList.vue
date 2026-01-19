<template>
  <div class="card">
    <div class="card-head mb10">
      <div class="card-title">公告列表</div>
      <el-button link type="primary" size="small">更多</el-button>
    </div>

    <div class="notice-list">
      <div
        v-for="item in notices"
        :key="item.id"
        class="notice-item"
        role="button"
        tabindex="0"
        @click="handleClick(item)"
      >
        <div class="notice-tag">
          <el-tag :type="item.type" size="small" effect="plain">{{ item.tag }}</el-tag>
        </div>
        <div class="notice-content">
          <div class="notice-title text-ellipsis">{{ item.title }}</div>
          <div class="notice-date muted">{{ item.date }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

export type NoticeItem = {
  id: string
  title: string
  tag: string
  type: '' | 'success' | 'warning' | 'info' | 'danger'
  date: string
  link?: string
}

defineProps<{
  notices: NoticeItem[]
}>()

function handleClick(item: NoticeItem) {
  if (item.link) {
    window.open(item.link, '_blank')
  } else {
    ElMessage.info(`点击了公告：${item.title}`)
  }
}
</script>

<style scoped>
.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .card-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
}

.notice-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notice-item {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 8px 0;
  cursor: pointer;
  border-bottom: 1px dashed var(--el-border-color-lighter);
  transition: all 0.2s;

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  &:first-child {
    padding-top: 0;
  }

  &:hover {
    .notice-title {
      color: var(--el-color-primary);
    }
  }

  .notice-tag {
    flex-shrink: 0;
  }

  .notice-content {
    display: flex;
    flex: 1;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    min-width: 0;
  }

  .notice-title {
    flex: 1;
    font-size: 13px;
    color: var(--el-text-color-primary);
  }

  .notice-date {
    flex-shrink: 0;
    font-size: 12px;
  }
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.muted {
  color: var(--el-text-color-secondary);
}
</style>
