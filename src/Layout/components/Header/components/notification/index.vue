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
  <el-popover placement="bottom" :width="300" trigger="click">
    <template #reference>
      <el-badge
        :is-dot="isDot"
        :value="value"
        :max="max"
        class="cursor-pointer"
        :offset="[-2, 14]"
      >
        <AppIcon :name="iconName" />
      </el-badge>
    </template>
    <!-- 继承 Popover 的 slot   -->
    <slot></slot>
  </el-popover>
</template>

<style scoped lang="scss"></style>
