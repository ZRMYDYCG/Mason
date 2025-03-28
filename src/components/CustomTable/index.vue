<script setup lang="ts">
import { ref } from 'vue'
import MasonTable from '../Table/index.vue'

const MasonTableRef = ref<InstanceType<typeof MasonTable> | null>(null)
</script>

<template>
  <div class="mason-custom-table">
    <MasonTable ref="MasonTableRef">
      <slot></slot>
      <template #otherOperate="{ row: $row }">
        <slot name="otherOperate" :row="$row"></slot>
      </template>
      <template #empty>
        <slot name="empty"></slot>
      </template>
    </MasonTable>
  </div>
</template>

<style scoped lang="scss"></style>
