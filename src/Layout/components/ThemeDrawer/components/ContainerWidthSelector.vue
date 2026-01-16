<script setup lang="ts">
import type { ContainerWidthEnum } from '@/config'

type ContainerWidthItem = {
  value: ContainerWidthEnum
  label: string
  icon: string
}

defineProps<{
  list: ContainerWidthItem[]
  active: ContainerWidthEnum
}>()

const emit = defineEmits<{
  (e: 'select', item: ContainerWidthItem): void
}>()
</script>

<template>
  <p class="title" style="margin-top: 50px">容器宽度</p>
  <div class="container-width">
    <div
      class="item"
      :class="{ 'is-active': active === item.value }"
      v-for="item in list"
      :key="item.value"
      @click="emit('select', item)"
    >
      <i class="iconfont" :class="item.icon"></i>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  position: relative;
  font-size: 14px;
  color: var(--app-text-tertiary);
  text-align: center;

  &::before,
  &::after {
    position: absolute;
    top: 10px;
    width: 50px;
    margin: auto;
    content: '';
    border-bottom: 1px solid var(--app-border);
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
}

.container-width {
  display: flex;

  .item {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 60px;
    margin-top: 20px;
    margin-right: 15px;
    margin-bottom: 15px;
    cursor: pointer;
    border: 2px solid var(--app-border-dark);
    border-radius: 10px;

    &:last-of-type {
      margin-right: 0;
    }

    &.is-active {
      border-color: $primary-color;

      i {
        color: var(--app-text-tertiary) !important;
      }
    }

    i {
      margin-right: 10px;
      font-size: 22px;
    }

    span {
      font-size: 14px;
      background: transparent !important;
    }
  }
}
</style>
