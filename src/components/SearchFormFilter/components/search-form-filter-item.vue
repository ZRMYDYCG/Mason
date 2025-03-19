<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { colProps } from 'element-plus'

defineOptions({
  name: 'MasonSearchFormFilterItem'
})

const attrs = useAttrs()

const colComputedAttrs: colProps = computed(() => {
  return {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 8,
    xl: 6,
    ...attrs?.col
  }
})
</script>

<template>
  <el-col v-bind="colComputedAttrs" class="search-form-filter-item">
    <slot></slot>
  </el-col>
</template>

<style scoped lang="scss"></style>
