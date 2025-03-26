<script lang="ts" setup>
defineOptions({
  name: 'MasonColumn'
})

interface IMasonColumnProps {
  scrollable: boolean
}

withDefaults(defineProps<IMasonColumnProps>(), {
  scrollable: true
})
</script>

<template>
  <div class="mason-column">
    <div class="mason-column-wrapper">
      <div class="mason-column__header">
        <slot name="header"></slot>
      </div>
      <el-scrollbar v-if="scrollable">
        <div class="mason-column__body">
          <slot></slot>
        </div>
      </el-scrollbar>
      <div v-else class="mason-column__body">
        <slot></slot>
      </div>
      <div class="mason-column__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mason-column {
  width: 100%;
  height: 100%;
  .mason-column-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    .mason-column__header {
      height: 44px;
      font-weight: 500;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 24px 12px;
      border-bottom: 1px solid #ebeef5;
    }
    .el-scrollbar {
      height: auto;
      flex: 1;
      .mason-column__body {
        padding: 12px 12px;
      }
    }
    .mason-column__footer {
      padding: 12px 12px;
      border-top: 1px solid #ebeef5;
    }
  }
}
</style>
