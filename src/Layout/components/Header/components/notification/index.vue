<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    icon?: string
    value?: string | number
    max?: number
    isDot?: boolean
  }>(),
  {
    icon: 'bell',
    isDot: false
  }
)

const iconName = computed(() => {
  if (props.icon === 'icon-email') return 'bell'
  return props.icon
})
</script>

<template>
  <el-popover placement="bottom" :width="280" trigger="click" popper-class="notification-popper">
    <template #reference>
      <el-badge
        :is-dot="isDot"
        :value="value"
        :max="max"
        class="notification-badge"
        :offset="[-2, 21]"
      >
        <AppIcon style="margin-top: 5px" :name="iconName" />
      </el-badge>
    </template>
    <!-- 继承 Popover 的 slot   -->
    <slot></slot>
  </el-popover>
</template>

<style scoped>
:global(.notification-popper) {
  padding: 0 !important;
  overflow: hidden;
  border-radius: 12px;
}
</style>
