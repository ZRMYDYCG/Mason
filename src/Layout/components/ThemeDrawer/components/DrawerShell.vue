<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div class="drawer-con">
    <div class="close-wrap" @click="emit('close')">
      <i class="iconfont icon-cha" />
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.drawer-con {
  padding: 0 5px 30px;

  .close-wrap {
    display: flex;
    justify-content: flex-end;

    i {
      display: block;
      padding: 8px;
      font-size: 15px;
      font-weight: bold;
      color: var(--mason-grey-600);
      cursor: pointer;
      border-radius: 5px;

      &:hover {
        color: var(--mason-grey-700);
        background-color: var(--fill-primary);
      }
    }
  }

  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>
