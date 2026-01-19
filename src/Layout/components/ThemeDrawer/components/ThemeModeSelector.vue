<script setup lang="ts">
import type { SystemThemeEnum } from '@/config'

type ThemeModeItem = {
  name: string
  theme: SystemThemeEnum
  color: string[]
  leftLineColor: string
  rightLineColor: string
}

defineProps<{
  list: ThemeModeItem[]
  active: SystemThemeEnum
}>()

const emit = defineEmits<{
  (e: 'select', item: ThemeModeItem): void
}>()
</script>

<template>
  <p class="title">主题风格</p>
  <div class="theme-wrap">
    <div class="item" v-for="(item, index) in list" :key="item.theme" @click="emit('select', item)">
      <div class="box" :class="{ 'is-active': item.theme === active }">
        <div :style="{ background: item.color[0] + '!important' }">
          <div
            v-for="(cItem, cIndex) in 3"
            :key="cIndex"
            :class="'line' + cIndex"
            :style="{ background: item.leftLineColor }"
          ></div>
        </div>
        <div :style="{ background: index === 2 ? item.color[1] : item.color[0] + '!important' }">
          <div
            v-for="(cItem, cIndex) in 3"
            :key="cIndex"
            :class="'line' + cIndex"
            :style="{ background: item.rightLineColor }"
          ></div>
        </div>
      </div>
      <p class="name">{{ item.name }}</p>
      <div class="active" v-show="item.theme === active"></div>
    </div>
  </div>
</template>

<style scoped>
@mixin preview-shell($border-color) {
  box-sizing: border-box;
  border: 2px solid $border-color;
  border-radius: 8px;
  box-shadow: var(--sys-shadow);
}

.title {
  position: relative;
  margin-top: 20px;
  font-size: 14px;
  color: var(--sys-text-3);
  text-align: center;

  &::before,
  &::after {
    position: absolute;
    top: 10px;
    width: 50px;
    margin: auto;
    content: '';
    border-bottom: 1px solid var(--sys-border);
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
}

.theme-wrap {
  display: flex;
  flex-wrap: wrap;
  width: calc(100% + 15px);
  margin-top: 25px;

  .item {
    box-sizing: border-box;
    width: calc(33.333% - 15px);
    margin-right: 15px;

    .box {
      position: relative;
      display: flex;
      height: 50px;
      overflow: hidden;
      cursor: pointer;

      @include preview-shell(var(--mason-grey-100));

      transition: box-shadow 0.1s;

      &.is-active {
        border: 2px solid var(--primary-color);
      }

      > div {
        position: relative;
        width: 50%;
        height: 100%;

        &:first-of-type {
          > div {
            width: 15px;
            height: 2px;
            margin: 5px 0 0 10px;

            &.line0 {
              margin-top: 13px;
            }

            &.line1 {
              width: 10px;
            }

            &.line2 {
              width: 13px;
            }
          }
        }

        &:last-of-type {
          > div {
            height: 5px;
            margin: 6px 0 0 5px;

            &.line0 {
              width: calc(100% - 15px);
              margin-top: 12px;
            }

            &.line1 {
              width: calc(50% - 5px);
            }

            &.line2 {
              width: calc(52%);
            }
          }
        }
      }
    }

    .name {
      margin-top: 6px;
      font-size: 14px;
      text-align: center;
    }

    .active {
      position: relative;
      right: 0;
      bottom: -5px;
      left: 0;
      width: 6px;
      height: 6px;
      margin: auto;
      background: var(--el-color-success) !important;
      border-radius: 50%;
    }
  }
}
</style>
