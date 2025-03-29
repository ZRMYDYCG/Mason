<template>
  <div class="mason-list">
    <div class="mason-list__wrapper">
      <a
        v-for="(item, index) in list"
        :key="index"
        href="javascript:void(0)"
        class="mason-list__item"
        :class="{
          'is-active': currentIndex === getObjectAttrValue(item, options.key)
        }"
        :draggable="draggable"
        @click="handleSwitchItem(item)"
        @click.right="handleContextMenu($event, item)"
      >
        <slot name="item" :item="item" :index="index">
          {{ getObjectAttrValue(item, options.label) }}
        </slot>
      </a>
      <el-empty v-show="isEmpty" :image-size="60" description="暂无数据" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { get } from 'lodash-es'
import type { EmptyProps } from 'element-plus'
import type { ComponentInternalInstance } from 'vue'

interface ListOptions {
  /** 主键字段名 */
  key: string
  /** 显示文本字段名 */
  label: string
}

interface ListProps {
  /** 数据列表 */
  list?: any[]
  /** 配置选项 */
  options?: ListOptions
  /** 是否可拖拽 */
  draggable?: boolean
  /** 切换前的钩子函数 */
  beforeLeave?: (index: number, item: any, value: unknown) => boolean | Promise<boolean>
}

interface ListEmits {
  (e: 'switch', value: unknown, item: any): void
  (e: 'rowContextMenu', event: MouseEvent, value: unknown, item: any): void
}

const props = withDefaults(defineProps<ListProps>(), {
  list: () => [],
  options: () => ({
    key: 'id',
    label: 'name'
  }),
  draggable: false
})

const emit = defineEmits<ListEmits>()

const currentIndex = ref<unknown>('')
const isEmpty = computed(() => props.list.length === 0)

const getObjectAttrValue = (object: any, path: string): unknown => {
  return get(object, path)
}

const handleSwitchItem = async (item: any) => {
  const index = props.list.findIndex((listItem) => {
    return (
      getObjectAttrValue(listItem, props.options.key) ===
      getObjectAttrValue(item, props.options.key)
    )
  })

  if (index === -1) return

  const value = getObjectAttrValue(item, props.options.key)
  let leaveConfirmed = true

  if (typeof props.beforeLeave === 'function') {
    try {
      const result = props.beforeLeave(index, item, value)
      leaveConfirmed = result instanceof Promise ? await result : result
    } catch {
      leaveConfirmed = false
    }
  }

  if (leaveConfirmed === false) return

  currentIndex.value = value
  emit('switch', currentIndex.value, item)
}

const handleContextMenu = (event: MouseEvent, item: any) => {
  handleSwitchItem(item)
  nextTick(() => {
    emit('rowContextMenu', event, currentIndex.value, item)
  })
}
</script>

<style lang="scss" scoped>
.mason-list {
  .mason-list__item {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    border: 1px solid #f5f7fa;
    border-bottom: 0;
    transition: background 0.3s;

    &:hover,
    &.is-active {
      color: var(--el-color-primary);
      background: #f5f7fa;
    }

    &:last-child {
      border-bottom: 1px solid #f5f7fa;
    }
  }
}
</style>
