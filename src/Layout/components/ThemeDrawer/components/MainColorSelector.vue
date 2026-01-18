<script setup lang="ts">
defineProps<{
  list: string[]
  active: string
}>()

const emit = defineEmits<{
  (e: 'select', color: string): void
}>()
</script>

<template>
  <p class="title" style="margin-top: 30px">系统主题色</p>
  <div class="main-color-wrap">
    <div class="offset">
      <div
        v-for="color in list"
        :key="color"
        class="color-item"
        :class="{ active: color === active }"
        :style="{ backgroundColor: color }"
        @click="emit('select', color)"
      >
        <i class="iconfont icon-dagou1" v-show="color == active"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.main-color-wrap {
  padding-top: 20px;

  .offset {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% + 12.5px);

    $size: 23px;

    > div.color-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: $size;
      height: $size;
      margin: 0 13px 10px 0;
      cursor: pointer;
      border-radius: $size;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 18px rgba(0, 0, 0, 0.12);
      transform: translateZ(0);

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background:
          radial-gradient(16px 16px at 28% 28%, rgba(255, 255, 255, 0.65), transparent 60%),
          radial-gradient(18px 18px at 78% 72%, rgba(0, 0, 0, 0.18), transparent 62%),
          linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(0, 0, 0, 0.12));
        opacity: 0.9;
        pointer-events: none;
      }

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 14px 26px rgba(0, 0, 0, 0.16);
      }

      &:active {
        transform: translateY(0);
        box-shadow: 0 10px 18px rgba(0, 0, 0, 0.12);
      }

      &.active {
        box-shadow:
          0 0 0 2px var(--app-bg-surface),
          0 0 0 4px rgba(var(--app-color-primary-rgb), 0.45),
          0 14px 26px rgba(0, 0, 0, 0.16);
      }

      &:last-of-type {
        margin-right: 0;
      }

      i {
        font-size: 14px;
        color: var(--app-text-inverse) !important;
      }
    }
  }
}
</style>
