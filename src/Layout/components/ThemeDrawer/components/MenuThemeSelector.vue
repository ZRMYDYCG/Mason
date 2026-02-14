<script setup lang="ts">
import type { MenuThemeType } from '@/config'

defineProps<{
  list: MenuThemeType[]
  active: string
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'select', item: MenuThemeType): void
}>()
</script>

<template>
  <p class="title" style="margin-top: 20px">菜单风格</p>
  <div class="menu-theme-wrap">
    <div>
      <div class="item" v-for="item in list" :key="item.theme" @click="emit('select', item)">
        <div
          class="box"
          :class="{ 'is-active': item.theme === active }"
          :style="{ cursor: disabled ? 'no-drop' : 'pointer' }"
        >
          <div class="top" :style="{ background: item.tabBarBackground + '!important' }"></div>
          <div class="left" :style="{ background: item.background + '!important' }">
            <div
              v-for="(cItem, index) in 3"
              :key="index"
              :class="'line' + index"
              :style="{ background: item.leftLineColor }"
            />
          </div>
          <div class="right">
            <div
              v-for="(cItem, index) in 3"
              :key="index"
              :class="'line' + index"
              :style="{ background: item.rightLineColor }"
            />
          </div>
        </div>
        <div class="active" v-if="item.theme === active"></div>
      </div>
    </div>
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

.menu-theme-wrap {
  margin-top: 20px;

  > div {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% + 15px);

    .item {
      width: calc(33.333% - 15px);
      margin-right: 15px;
      margin-bottom: 15px;

      &:last-of-type {
        margin-right: 0;
      }

      .box {
        position: relative;
        box-sizing: border-box;
        height: 50px;
        overflow: hidden;
        cursor: pointer;
        background: var(--fill-secondary) !important;
        border: 2px solid var(--mason-grey-100);
        border-radius: 8px;
        box-shadow: var(--shadow-color);
        transition: box-shadow 0.1s;

        &.is-active {
          border: 2px solid var(--primary-color);
        }

        &:nth-child(even) {
          margin-right: 0;
        }

        .top {
          width: 100%;
          height: 8px;
        }

        .left {
          position: absolute;
          top: 0;
          left: 0;
          width: 22px;
          height: 100%;

          > div {
            width: 15px;
            height: 2px;
            margin: 5px 0 0 4px;

            &.line0 {
              margin-top: 15px;
            }

            &.line1 {
              width: 10px;
            }

            &.line2 {
              width: 13px;
            }
          }
        }

        .right {
          position: absolute;
          top: 0;
          right: 0;
          width: 46px;
          height: 100%;

          > div {
            height: 6px;
            margin: 5px 0 0 5px;

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

      .active {
        width: 6px;
        height: 6px;
        margin: auto;
        margin-top: 8px;
        background: var(--el-color-success) !important;
        border-radius: 50%;
      }
    }
  }
}
</style>
