<script lang="ts" setup>
interface ILineTreeProps {
  data: any[]
}

withDefaults(defineProps<ILineTreeProps>(), {
  data: () => []
})
</script>

<template>
  <div class="mason-line-tree">
    <div v-for="(row, index) in data" :key="index"></div>
  </div>
</template>

<style lang="scss" scoped>
.mason-line-tree {
  .row {
    display: flex;
  }
}
</style>
