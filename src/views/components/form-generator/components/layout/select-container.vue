<script setup lang="ts">
import { components } from '../../config/index.ts'
import { ComponentItem } from '../../types/index.ts'

const dragStart = (e: DragEvent, item: ComponentItem) => {
  e.dataTransfer!.setData('item', JSON.stringify(item))
}
</script>

<template>
  <div class="select-container">
    <div class="select-container__wrapper">
      <div
        class="select-container-item"
        v-for="(item, index) in components"
        :key="index"
        :draggable="true"
        @dragstart="dragStart($event, item)"
      >
        <i :class="['iconfont', `icon-${item.icon}`]"></i>
        <el-text>{{ item.label }}</el-text>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select-container {
  height: 100%;
  padding: 20px;
  border-right: 1px solid #ccc;
  .select-container__wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .select-container-item {
    display: flex;
    background-color: #fff;
    padding: 0 5px;
    border-radius: 3px;
    align-items: center;
    gap: 10px;

    &:hover {
      background-color: #ccc;
      color: black;
      cursor: move;
    }
  }
}

.dark .select-container-item {
  background-color: #303133;
  &:hover {
    background-color: #303133;
    color: white;
  }
}
</style>
