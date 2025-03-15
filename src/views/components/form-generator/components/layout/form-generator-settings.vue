<script setup lang="ts">
import FormAttrs from '../attrs/form-attrs/index.vue'
</script>

<template>
  <el-scrollbar>
    <el-tabs>
      <el-tab-pane label="组件属性">xx</el-tab-pane>
      <el-tab-pane label="表单属性">
        <FormAttrs />
      </el-tab-pane>
    </el-tabs>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.el-scrollbar {
  height: 100%;
  .el-tabs {
    height: 100%;
  }
}
</style>
