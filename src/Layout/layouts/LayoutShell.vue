<template>
  <el-container class="layout">
    <slot name="beforeAside" />
    <slot name="aside" />
    <el-container>
      <el-header>
        <div class="flex gap-2">
          <slot name="headerLeft" />
        </div>
        <slot name="headerRight" />
      </el-header>
      <slot name="main" />
      <slot name="footer" />
    </el-container>
  </el-container>
  <slot name="overlay" />
</template>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100%;
  scrollbar-width: none;
}

.layout {
  :deep(.el-aside) {
    width: auto;
    border-right: 1px solid var(--el-border-color-light);
  }

  :deep(.el-aside .aside) {
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: width 0.3s ease;
  }

  :deep(.el-aside .aside .el-scrollbar) {
    position: relative;
    height: calc(100% - 55px);
  }

  :deep(.el-aside .aside .el-scrollbar .el-menu) {
    width: 100%;
    overflow-x: hidden;
    border-right: none;
  }

  :deep(.el-header) {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    padding: 0 15px;
    border-bottom: 1px solid var(--el-border-color-light);
  }
}
</style>

