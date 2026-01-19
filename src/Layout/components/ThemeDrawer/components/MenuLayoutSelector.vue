<script setup lang="ts">
import { MenuTypeEnum } from '@/config'

defineProps<{
  menuType: MenuTypeEnum
}>()

const emit = defineEmits<{
  (e: 'select', type: MenuTypeEnum): void
}>()
</script>

<template>
  <div>
    <p class="title" style="margin-top: 30px">菜单布局</p>
    <div class="menu-type">
      <div class="menu-type-wrap">
        <div class="item">
          <div
            class="box bl"
            :class="{ 'is-active': menuType === MenuTypeEnum.LEFT }"
            @click="emit('select', MenuTypeEnum.LEFT)"
          >
            <div class="bl-menu">
              <div class="line" v-for="i in 6" :key="i"></div>
            </div>
            <div class="bl-content">
              <div class="header"></div>
              <div class="row1">
                <div v-for="i in 2" :key="i"></div>
              </div>
              <div class="row2"></div>
            </div>
          </div>
          <span class="name">垂直</span>
        </div>

        <div class="item">
          <div
            class="box bt"
            :class="{ 'is-active': menuType === MenuTypeEnum.TOP }"
            @click="emit('select', MenuTypeEnum.TOP)"
          >
            <div class="bt-menu">
              <div class="line" v-for="i in 6" :key="i"></div>
            </div>
            <div class="bl-content">
              <div class="row1">
                <div v-for="i in 2" :key="i"></div>
              </div>
              <div class="row2"></div>
            </div>
          </div>
          <span class="name">水平</span>
        </div>

        <div class="item">
          <div
            class="box tl"
            :class="{ 'is-active': menuType === MenuTypeEnum.TOP_LEFT }"
            @click="emit('select', MenuTypeEnum.TOP_LEFT)"
          >
            <div class="tl-left">
              <div class="line" v-for="i in 6" :key="i"></div>
            </div>
            <div class="tl-right">
              <div class="bt-menu">
                <div class="line" v-for="i in 6" :key="i"></div>
              </div>
              <div class="bl-content">
                <div class="row1">
                  <div v-for="i in 2" :key="i"></div>
                </div>
                <div class="row2"></div>
              </div>
            </div>
          </div>
          <span class="name">混合</span>
        </div>

        <div class="item" style="padding-right: 7px">
          <div
            class="box dl"
            :class="{ 'is-active': menuType === MenuTypeEnum.DUAL_MENU }"
            @click="emit('select', MenuTypeEnum.DUAL_MENU)"
          >
            <div class="tl1-left" style="width: 8px !important">
              <div class="line" v-for="i in 1" :key="i"></div>
            </div>
            <div class="tl2-left">
              <div class="line" v-for="i in 6" :key="i"></div>
            </div>
            <div class="tl-right">
              <div class="bt-menu"></div>
              <div class="bl-content">
                <div class="row1">
                  <div v-for="i in 2" :key="i"></div>
                </div>
                <div class="row2"></div>
              </div>
            </div>
          </div>
          <span class="name">双列</span>
        </div>
      </div>
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

.menu-type {
  padding-bottom: 20px;
  margin-top: 20px;

  :deep(.el-scrollbar__bar.is-vertical) {
    display: none;
  }

  :deep(.el-scrollbar__bar.is-horizontal) {
    height: 3px;
  }

  .menu-type-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: calc(100% + 15px);
    padding-bottom: 10px;

    .item {
      width: calc(33.333% - 15px);
      margin-right: 15px;
      text-align: center;

      &:nth-child(3n) {
        margin-right: 0;
      }

      &:nth-child(4n) {
        margin-top: 20px;
      }

      .box {
        @include preview-shell(transparent);

        height: 50px;
        cursor: pointer;
        background-color: var(--sys-fill-light);

        &.is-active {
          border: 2px solid var(--primary-color);
        }

        &.bl {
          display: flex;
          justify-content: space-between;

          .bl-menu {
            box-sizing: border-box;
            width: 16px;
            height: calc(100% - 4px);
            padding: 0 3px;
            margin: 2px 0 0 2px;
            overflow: hidden;
            background-color: var(--sys-border);
            border-radius: 2px;

            .line {
              width: 100%;
              height: 2px;
              margin-top: 4.4px;
              background: var(--sys-bg-surface);
              border-radius: 1px;
            }
          }

          .bl-content {
            box-sizing: border-box;
            width: calc(100% - 16px);
            height: 100%;
            padding: 4px 5px;

            .header {
              height: 6px;
              margin: auto;
              background-color: var(--sys-fill);
              border-radius: 2px;
            }

            .row1 {
              display: flex;
              justify-content: space-between;
              margin-top: 4px;

              div {
                height: 12px;
                background-color: var(--sys-fill);
                border-radius: 2px;

                &:first-of-type {
                  width: 35%;
                }

                &:last-of-type {
                  width: 55%;
                }
              }
            }

            .row2 {
              height: 12px;
              margin-top: 4px;
              background-color: var(--sys-fill);
            }
          }
        }

        &.bt {
          padding: 0 5px;

          .bt-menu {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            height: 10px;
            padding: 0 3px;
            margin: 2px auto;
            overflow: hidden;
            background-color: var(--sys-border);
            border-radius: 2px;

            .line {
              width: 7px;
              height: 2px;
              margin-right: 2px;
              background: var(--sys-bg-surface);
            }
          }

          .bl-content {
            box-sizing: border-box;
            height: 100%;

            .row1 {
              display: flex;
              justify-content: space-between;
              margin-top: 4px;

              div {
                height: 12px;
                background-color: var(--sys-fill);
                border-radius: 2px;

                &:first-of-type {
                  width: 37%;
                }

                &:last-of-type {
                  width: 55%;
                }
              }
            }

            .row2 {
              height: 12px;
              margin-top: 4px;
              background-color: var(--sys-fill);
            }
          }
        }

        &.tl {
          display: flex;
          justify-content: space-between;
          padding: 0 5px;

          .tl-left {
            min-width: 10px;
            margin: 2px 0;
            background-color: var(--sys-border);
            border-radius: 2px;

            > div {
              width: 4px;
              height: 2px;
              margin: 4px auto;
              background: var(--sys-bg-surface);
            }
          }

          .tl-right {
            width: calc(100% - 14px);

            .bt-menu {
              box-sizing: border-box;
              display: flex;
              align-items: center;
              height: 10px;
              padding: 0 3px;
              margin: 2px auto;
              overflow: hidden;
              background-color: var(--sys-border);
              border-radius: 2px;

              .line {
                width: 7px;
                height: 2px;
                margin-right: 2px;
                background: var(--sys-bg-surface);
              }
            }

            .bl-content {
              box-sizing: border-box;
              height: 100%;

              .row1 {
                display: flex;
                justify-content: space-between;
                margin-top: 4px;

                div {
                  height: 12px;
                  background-color: var(--sys-fill);
                  border-radius: 2px;

                  &:first-of-type {
                    width: 37%;
                  }

                  &:last-of-type {
                    width: 55%;
                  }
                }
              }

              .row2 {
                height: 12px;
                margin-top: 4px;
                background-color: var(--sys-fill);
              }
            }
          }
        }

        &.dl {
          display: flex;
          justify-content: space-between;
          padding: 0 5px;

          .tl1-left {
            min-width: 6px;
            margin: 2px 0;
            margin-right: 2px;
            background-color: var(--sys-fill);
            border-radius: 2px;

            > div {
              width: 4px;
              height: 2px;
              margin: 4px auto;
              background: var(--sys-bg-surface);
            }
          }

          .tl2-left {
            min-width: 10px;
            margin: 2px 0;
            margin-right: 4px;
            background-color: var(--sys-border);
            border-radius: 2px;

            > div {
              width: 4px;
              height: 2px;
              margin: 4px auto;
              background: var(--sys-bg-surface);
            }
          }

          .tl-right {
            width: calc(100% - 22px);

            .bt-menu {
              box-sizing: border-box;
              display: flex;
              align-items: center;
              height: 6px;
              padding: 0 3px;
              margin: 2px auto;
              overflow: hidden;
              background-color: var(--sys-fill);
              border-radius: 2px;
            }

            .bl-content {
              box-sizing: border-box;
              height: 100%;

              .row1 {
                display: flex;
                justify-content: space-between;
                margin-top: 4px;

                div {
                  height: 13px;
                  background-color: var(--sys-fill);
                  border-radius: 2px;

                  &:first-of-type {
                    width: 37%;
                  }

                  &:last-of-type {
                    width: 55%;
                  }
                }
              }

              .row2 {
                height: 13px;
                margin-top: 4px;
                background-color: var(--sys-fill);
              }
            }
          }
        }
      }

      .name {
        display: block;
        margin-top: 8px;
        font-size: 13px;
        line-height: 1;
        color: var(--mason-grey-700);
      }
    }
  }
}
</style>
