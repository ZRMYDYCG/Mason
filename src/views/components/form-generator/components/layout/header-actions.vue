<script setup lang="ts"></script>

<template>
  <el-space>
    <div class="form-generator-select__header-actions-item">
      <i class="iconfont icon-bofang" />
      <span>运行</span>
    </div>
    <div class="form-generator-select__header-actions-item">
      <i class="iconfont icon-download" />
      <span>导出vue文件</span>
    </div>
    <div class="form-generator-select__header-actions-item">
      <i class="iconfont icon-daima" />
      <span>复制代码</span>
    </div>
    <div class="form-generator-select__header-actions-item">
      <i class="iconfont icon-shanchu" />
      <span>清空</span>
    </div>
  </el-space>
</template>

<style scoped lang="scss">
.form-generator-select__header-actions-item {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
