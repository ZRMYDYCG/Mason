<script setup lang="ts">
defineProps<{
  boxBorderMode: boolean
}>()
</script>

<template>
  <p class="title" style="margin-top: 40px">盒子样式</p>
  <div class="box-style">
    <div v-if="false">{{ boxBorderMode }}</div>
    <div class="button" :class="{ 'is-active': boxBorderMode }">边框</div>
    <div class="button" :class="{ 'is-active': !boxBorderMode }">阴影</div>
  </div>
</template>

<style scoped>
.title {
  position: relative;
  font-size: 14px;
  color: var(--text-tertiary);
  text-align: center;

  &::before,
  &::after {
    position: absolute;
    top: 10px;
    width: 50px;
    margin: auto;
    content: '';
    border-bottom: 1px solid var(--border-default);
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
}

.box-style {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  margin-top: 20px;
  background-color: var(--fill-secondary);
  border-radius: 7px;

  .button {
    width: calc(50% - 3px);
    height: 34px;
    font-size: 14px;
    line-height: 34px;
    text-align: center;
    cursor: pointer;
    user-select: none;
    border-radius: 6px;
    transition: all 0.2s !important;

    &.is-active {
      color: var(--text-primary);
      background-color: var(--bg-surface);
    }

    &:hover:not(.is-active) {
      color: var(--text-primary);
      background-color: var(--fill-primary);
    }
  }
}
</style>
