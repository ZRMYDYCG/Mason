<script setup lang="ts">
interface ListItem {
  /*头像*/
  avatar?: string
  /*标题*/
  title?: string
  /*描述*/
  desc?: string
  /*时间*/
  time?: string
  /*标签*/
  tag?: string
  /*标签类型*/
  tagType?: '' | 'success' | 'info' | 'warning' | 'danger'
}

interface ListOptions {
  title: string
  content: ListItem[]
}

export interface ActionOptions {
  text: string
  icon?: string
}

const props = defineProps<{
  list: ListOptions[]
  actions: ActionOptions[]
}>()

const emits = defineEmits(['click-item', 'click-action'])

const clickItem = (item: ListItem, index: number) => {
  emits('click-item', item, index)
}

const clickAction = (item: ActionOptions, index: number) => {
  emits('click-action', item, index)
}
</script>

<template>
  <div class="notification-panel">
    <el-tabs class="panel-tabs" stretch>
      <el-tab-pane v-for="(group, groupIndex) in list" :key="groupIndex" :label="group.title">
        <el-scrollbar class="panel-scroll" max-height="320px">
          <el-empty v-if="(group.content?.length ?? 0) === 0" description="暂无消息" />

          <div
            v-else
            v-for="(item, itemIndex) in group.content"
            :key="itemIndex"
            class="panel-item"
            role="button"
            tabindex="0"
            @click="clickItem(item, itemIndex)"
            @keydown.enter.prevent="clickItem(item, itemIndex)"
            @keydown.space.prevent="clickItem(item, itemIndex)"
          >
            <div class="item-avatar">
              <el-avatar v-if="item.avatar" :src="item.avatar" :size="32" />
              <el-avatar v-else :size="32" class="avatar-fallback">
                <AppIcon name="bell" :size="16" />
              </el-avatar>
            </div>

            <div class="item-content">
              <div class="item-top">
                <div class="item-title" v-if="item.title">{{ item.title }}</div>
                <el-tag
                  v-if="item.tagType && item.tag"
                  size="small"
                  effect="plain"
                  :type="item.tagType"
                >
                  {{ item.tag }}
                </el-tag>
              </div>
              <div class="item-desc" v-if="item.desc">{{ item.desc }}</div>
              <div class="item-time" v-if="item.time">{{ item.time }}</div>
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>

    <!-- <div class="panel-footer" v-if="actions.length">
      <el-button
        v-for="(action, actionIndex) in actions"
        :key="actionIndex"
        link
        size="small"
        type="primary"
        class="footer-action"
        @click="clickAction(action, actionIndex)"
      >
        <AppIcon style="margin-right: 4px" v-if="action.icon" :name="action.icon" :size="16" />
        <span>{{ action.text }}</span>
      </el-button>
    </div> -->
  </div>
</template>

<style scoped>
.notification-panel {
  width: 100%;
  background: var(--sys-bg-surface);
}

.panel-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 12px 14px 8px;
}

.panel-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--sys-text);
}

.panel-subtitle {
  font-size: 12px;
  color: var(--sys-text-2);
}

.panel-tabs {
  :deep(.el-tabs__header) {
    margin: 0;
  }

  :deep(.el-tabs__nav-wrap::after) {
    height: 1px;
    background-color: var(--sys-border-light);
  }

  :deep(.el-tabs__item) {
    height: 40px;
    font-size: 13px;
    color: var(--sys-text-2);
  }

  :deep(.el-tabs__item.is-active) {
    font-weight: 600;
    color: var(--sys-brand);
  }
}

.panel-scroll {
  padding: 6px 8px 10px;
}

.panel-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.15s ease;
}

.panel-item:hover {
  background-color: var(--sys-fill-light);
}

.panel-item:focus-visible {
  outline: 2px solid rgba(var(--sys-brand-rgb), 0.35);
  outline-offset: 2px;
}

.item-avatar {
  flex-shrink: 0;
  margin-top: 1px;
}

.avatar-fallback {
  color: var(--sys-text-2);
  background-color: var(--sys-fill);
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-top {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
}

.item-title {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  font-size: 13px;
  font-weight: 600;
  color: var(--sys-text);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-desc {
  margin-top: 4px;
  overflow: hidden;
  font-size: 12px;
  color: var(--sys-text-2);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-time {
  margin-top: 4px;
  font-size: 12px;
  color: var(--sys-text-3);
}

.panel-footer {
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 10px 12px;
  border-top: 1px solid var(--sys-border-light);
}

.footer-action {
  display: inline-flex;
  gap: 6px;
  align-items: center;
}
</style>
