<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import mittBus from '@/utils/mittBus'
import { SettingThemeList, ThemeList, SystemMainColor } from '@/config'
import { MenuTypeEnum, ContainerWidthEnum, MenuThemeEnum } from '@/config'
import { useSettingStore } from '@/store/modules/setting.ts'
import { useTheme } from '@/hooks/useTheme.ts'
import { ElMessage } from 'element-plus'

const store = useSettingStore()

const drawerVisible = ref(false)

const { switchDark, changePrimary } = useTheme()

const menuThemeList = ThemeList
const mainColor = SystemMainColor
const isDark = computed(() => store.isDark)
const systemThemeMode = computed(() => store.systemThemeMode)
const currentMenuTheme = computed(() => store.menuThemeType)
const systemThemeColor = computed(() => store.systemThemeColor)
const boxBorderMode = computed(() => store.boxBorderMode)
const customRadius = computed(() => store.customRadius)
const isLeftMenu = computed(() => store.menuType === MenuTypeEnum.LEFT)
const isTopMenu = computed(() => store.menuType === MenuTypeEnum.TOP)
const isTopLeftMenu = computed(() => store.menuType === MenuTypeEnum.TOP_LEFT)
const isDualMenu = computed(() => store.menuType === MenuTypeEnum.DUAL_MENU)
const showLanguage = ref(true)
const containerWidth = computed(() => store.containerWidth)
const pageTransitionOps = [
  {
    value: '',
    label: '无动画'
  },
  {
    value: 'fade',
    label: 'fade'
  },
  {
    value: 'fade-transform',
    label: 'fade-transform'
  },
  {
    value: 'slide-right',
    label: 'slide-right'
  },
  {
    value: 'slide-top',
    label: 'slide-top'
  },
  {
    value: 'slide-bottom',
    label: 'slide-bottom'
  }
]
const customRadiusOps = [
  {
    value: '0',
    label: '0'
  },
  {
    value: '0.25',
    label: '0.25'
  },
  {
    value: '0.5',
    label: '0.5'
  },
  {
    value: '0.75',
    label: '0.75'
  },
  {
    value: '1',
    label: '1'
  }
]
const containerWidthList = [
  {
    value: ContainerWidthEnum.FULL,
    label: '铺满',
    icon: 'icon-dengbigaodupumankegundong--xianxing'
  },
  {
    value: ContainerWidthEnum.BOXED,
    label: '定宽',
    icon: 'icon-gudingkuandu'
  }
]

const {
  colorWeak,
  watermarkVisible,
  showWorkTab,
  uniqueOpened,
  showCrumbs,
  menuOpenWidth,
  showNprogress,
  pageTransition,
  showRefreshButton,
  showMenuButton,
  isFooter
} = storeToRefs(store)

// 设置菜单布局
const setMenuType = (type: MenuTypeEnum) => {
  if (type === MenuTypeEnum.LEFT || type === MenuTypeEnum.TOP_LEFT) store.setMenuOpen(true)
  store.setMenuType(type)
  if (type === MenuTypeEnum.DUAL_MENU) {
    store.setMenuTheme(MenuThemeEnum.DESIGN)
    store.setMenuOpen(true)
  }
}

// 设置菜单主图
const setMenuTheme = (item) => {
  if (isDualMenu.value || isTopMenu.value || isDark.value) {
    return
  }
  store.setMenuTheme(item.theme)
}

// 设置（白天/黑夜/随系统）模式
const setTheme = (item) => {
  store.setGlopTheme(item.theme, item.theme)
}

// 设置项目主题颜色
const setSystemThemeColor = (color) => {
  store.setElementTheme(color)
}

// 设置容器宽度
const setContainerWidth = (item) => {
  store.setContainerWidth(item.value)
}

// 设置色弱模式
const setColorWeak = () => {
  let el = document.getElementsByTagName('html')[0]
  if (colorWeak.value) {
    el.setAttribute('class', 'color-weak')
  } else {
    el.className = el.className.replace(/\bcolor-weak\b/g, '').trim()
  }
}

// 复制配置
const copyConfig = () => {
  const config = localStorage.getItem('setting')
  if (config) {
    navigator.clipboard
      .writeText(config)
      .then(() => {
        ElMessage.success('配置已复制到剪贴板')
      })
      .catch((err) => {
        ElMessage.error('复制失败：' + err)
      })
  } else {
    ElMessage.error('未找到配置')
  }
}

watch(systemThemeMode, () => {
  switchDark()
})

watch(systemThemeColor, (val) => {
  changePrimary(val)
})

mittBus.on('openThemeDrawer', () => (drawerVisible.value = true))
</script>

<template>
  <div class="setting">
    <el-drawer
      size="300px"
      v-model="drawerVisible"
      :lock-scroll="false"
      :with-header="false"
      modal-class="setting-modal"
    >
      <div class="drawer-con">
        <div class="close-wrap" @click="drawerVisible = false">
          <i class="iconfont icon-cha" />
        </div>

        <!-- 主题风格 -->
        <p class="title">主题风格</p>
        <div class="theme-wrap">
          <div
            class="item"
            v-for="(item, index) in SettingThemeList"
            :key="item.theme"
            @click="setTheme(item)"
          >
            <div class="box" :class="{ 'is-active': item.theme === systemThemeMode }">
              <div :style="{ background: item.color[0] + '!important' }">
                <div
                  v-for="(cItem, index) in 3"
                  :key="index"
                  :class="'line' + index"
                  :style="{ background: item.leftLineColor }"
                ></div>
              </div>
              <div
                :style="{ background: index === 2 ? item.color[1] : item.color[0] + '!important' }"
              >
                <div
                  v-for="(cItem, index) in 3"
                  :key="index"
                  :class="'line' + index"
                  :style="{ background: item.rightLineColor }"
                ></div>
              </div>
            </div>
            <p class="name">{{ item.name }}</p>
            <div class="active" v-show="item.theme === systemThemeMode"></div>
          </div>
        </div>

        <!-- 菜单布局 -->
        <div>
          <p class="title" style="margin-top: 30px">菜单布局</p>
          <div class="menu-type">
            <div class="menu-type-wrap">
              <!-- 左侧菜单 -->
              <div class="item">
                <div
                  class="box bl"
                  :class="{ 'is-active': isLeftMenu }"
                  @click="setMenuType(MenuTypeEnum.LEFT)"
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
              <!-- 顶部菜单 -->
              <div class="item">
                <div
                  class="box bt"
                  :class="{ 'is-active': isTopMenu }"
                  @click="setMenuType(MenuTypeEnum.TOP)"
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
              <!-- 混合菜单 -->
              <div class="item">
                <div
                  class="box tl"
                  :class="{ 'is-active': isTopLeftMenu }"
                  @click="setMenuType(MenuTypeEnum.TOP_LEFT)"
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
              <!-- 双列菜单 -->
              <div class="item" style="padding-right: 7px">
                <div
                  class="box dl"
                  :class="{ 'is-active': isDualMenu }"
                  @click="setMenuType(MenuTypeEnum.DUAL_MENU)"
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

        <!-- 菜单风格 -->
        <p class="title" style="margin-top: 20px">菜单风格</p>
        <div class="menu-theme-wrap">
          <div>
            <div
              class="item"
              v-for="item in menuThemeList"
              :key="item.theme"
              @click="setMenuTheme(item)"
            >
              <div
                class="box"
                :class="{ 'is-active': item.theme === currentMenuTheme }"
                :style="{
                  cursor: isDualMenu || isTopMenu || isDark ? 'no-drop' : 'pointer'
                }"
              >
                <div
                  class="top"
                  :style="{ background: item.tabBarBackground + '!important' }"
                ></div>
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
              <div class="active" v-if="item.theme === currentMenuTheme"></div>
            </div>
          </div>
        </div>

        <!-- 系统主题色 -->
        <p class="title" style="margin-top: 30px">系统主题色</p>
        <div class="main-color-wrap">
          <div class="offset">
            <div
              v-for="color in mainColor"
              :key="color"
              :style="{ background: `${color} !important` }"
              @click="setSystemThemeColor(color)"
            >
              <i class="iconfont icon-dagou1" v-show="color == systemThemeColor"></i>
            </div>
          </div>
        </div>

        <!-- 盒子样式 -->
        <p class="title" style="margin-top: 40px">盒子样式</p>
        <div class="box-style">
          <div v-if="false">{{ boxBorderMode }}</div>
          <div class="button" :class="{ 'is-active': boxBorderMode }">边框</div>
          <div class="button" :class="{ 'is-active': !boxBorderMode }">阴影</div>
        </div>

        <!-- 容器宽度 -->
        <p class="title" style="margin-top: 50px">容器宽度</p>
        <div class="container-width">
          <div
            class="item"
            :class="{ 'is-active': containerWidth === item.value }"
            v-for="item in containerWidthList"
            :key="item.value"
            @click="setContainerWidth(item)"
          >
            <i class="iconfont" :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </div>
        </div>

        <!-- 基础配置 -->
        <p class="title" style="margin-top: 40px">基础配置</p>
        <div class="basic-box">
          <div class="item">
            <span>开启多标签栏</span>
            <el-switch v-model="showWorkTab" />
          </div>
          <div class="item" style="display: flex">
            <span>侧边栏开启手风琴模式</span>
            <el-switch v-model="uniqueOpened" />
          </div>
          <div class="item">
            <span>显示折叠侧边栏按钮</span>
            <el-switch v-model="showMenuButton" />
          </div>
          <div class="item">
            <span>显示重载页面按钮</span>
            <el-switch v-model="showRefreshButton" />
          </div>
          <div class="item mobile-hide">
            <span>显示全局面包屑导航</span>
            <el-switch v-model="showCrumbs" />
          </div>
          <div class="item">
            <span>显示多语言选择</span>
            <el-switch v-model="showLanguage" />
          </div>
          <div class="item">
            <span>显示顶部进度条</span>
            <el-switch v-model="showNprogress" />
          </div>
          <div class="item">
            <span>色弱模式</span>
            <el-switch @change="setColorWeak" v-model="colorWeak" />
          </div>
          <div class="item">
            <span>全局水印</span>
            <el-switch v-model="watermarkVisible" />
          </div>
          <div class="item">
            <span>是否展示页脚</span>
            <el-switch v-model="isFooter" />
          </div>
          <div class="item" style="display: flex">
            <span>菜单宽度</span>
            <el-input-number
              :min="210"
              :max="400"
              size="default"
              :step="10"
              style="width: 120px"
              v-model="menuOpenWidth"
              controls-position="right"
            />
          </div>
          <div class="item" style="display: flex">
            <span>页面切换动画</span>
            <el-select
              v-model="pageTransition"
              placeholder="Select"
              size="default"
              style="width: 120px"
            >
              <el-option
                v-for="item in pageTransitionOps"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="item" style="display: flex">
            <span>自定义圆角</span>
            <el-select
              v-model="customRadius"
              placeholder="Select"
              size="default"
              style="width: 120px"
            >
              <el-option
                v-for="item in customRadiusOps"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <el-divider>开发者选项</el-divider>
          <div class="w-full">
            <el-button @click="copyConfig" style="width: 100%">复制配置</el-button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.drawer-con {
  $box-shadow: 0 2px 8px 0 rgb(0 0 0 / 20%);
  $box-radius: 8px;
  $device-ipad: 784px;
  $primary-color: var(--el-color-primary);

  $mason-grey-100: #ffffff !default;
  $mason-grey-200: #fafafa !default;
  $mason-grey-300: #f5f5f5 !default;
  $mason-grey-400: #e8e8e8 !default;
  $mason-grey-500: #d9d9d9 !default;
  $mason-grey-600: #bfbfbf !default;
  $mason-grey-700: #8c8c8c !default;
  $mason-grey-800: #595959 !default;
  $mason-grey-900: #262626 !default;
  $mason-grey-1000: #000000 !default;
  $mason-grey-100-rgb: rgb(255, 255, 255) !default;
  $mason-grey-200-rgb: rgb(250, 250, 250) !default;
  $mason-grey-300-rgb: rgb(245, 245, 245) !default;
  $mason-grey-400-rgb: rgb(232, 232, 232) !default;
  $mason-grey-500-rgb: rgb(217, 217, 217) !default;
  $mason-grey-600-rgb: rgb(191, 191, 191) !default;
  $mason-grey-700-rgb: rgb(140, 140, 140) !default;
  $mason-grey-800-rgb: rgb(89, 89, 89) !default;
  $mason-grey-900-rgb: rgb(38, 38, 38) !default;
  $mason-grey-1000-rgb: rgb(0, 0, 0) !default;

  padding: 0 5px 30px;

  .close-wrap {
    display: flex;
    justify-content: flex-end;

    i {
      display: block;
      padding: 8px;
      font-size: 15px;
      font-weight: bold;
      color: $mason-grey-600;
      cursor: pointer;
      border-radius: 5px;

      &:hover {
        color: var(--mason-grey-700);
        background-color: rgb($mason-grey-300-rgb, 0.5);
      }
    }
  }

  .title {
    position: relative;
    font-size: 14px;
    color: #6b7280;
    text-align: center;

    &:first-of-type {
      margin-top: 20px;
    }

    &::before,
    &::after {
      position: absolute;
      top: 10px;
      width: 50px;
      margin: auto;
      content: '';
      border-bottom: 1px solid rgba($mason-grey-300-rgb, 0.8);
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

    // 隐藏滚动条
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
          box-sizing: border-box;
          height: 50px;
          cursor: pointer;
          background-color: #f5f7f9;
          border: 2px solid transparent;
          border-radius: $box-radius;
          box-shadow: $box-shadow;

          &.is-active {
            border: 2px solid $primary-color;
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
              background-color: #ddd;
              border-radius: 2px;

              .line {
                width: 100%;
                height: 2px;
                margin-top: 4.4px;
                background: #fff;
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
                background-color: #edeef0;
                border-radius: 2px;
              }

              .row1 {
                display: flex;
                justify-content: space-between;
                margin-top: 4px;

                div {
                  height: 12px;
                  background-color: #edeef0;
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
                background-color: #edeef0;
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
              background-color: #ddd;
              border-radius: 2px;

              .line {
                width: 7px;
                height: 2px;
                margin-right: 2px;
                background: #fff;
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
                  background-color: #edeef0;
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
                background-color: #edeef0;
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
              background-color: #ddd;
              border-radius: 2px;

              > div {
                width: 4px;
                height: 2px;
                margin: 4px auto;
                background: #fff;
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
                background-color: #ddd;
                border-radius: 2px;

                .line {
                  width: 7px;
                  height: 2px;
                  margin-right: 2px;
                  background: #fff;
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
                    background-color: #edeef0;
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
                  background-color: #edeef0;
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
              background-color: #edeef0;
              border-radius: 2px;

              > div {
                width: 4px;
                height: 2px;
                margin: 4px auto;
                background: #fff;
              }
            }

            .tl2-left {
              min-width: 10px;
              margin: 2px 0;
              margin-right: 4px;
              background-color: #ddd;
              border-radius: 2px;

              > div {
                width: 4px;
                height: 2px;
                margin: 4px auto;
                background: #fff;
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
                background-color: #edeef0;
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
                    background-color: #edeef0;
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
                  background-color: #edeef0;
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
          color: $mason-grey-700;
        }
      }
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
        box-sizing: border-box;
        display: flex;
        height: 50px;
        overflow: hidden;
        cursor: pointer;
        border: 2px solid $mason-grey-100;
        border-radius: $box-radius;
        box-shadow: $box-shadow;
        transition: box-shadow 0.1s;

        &.is-active {
          border: 2px solid $primary-color;
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
          background: #f5f7f9 !important;
          border: 2px solid $mason-grey-100;
          border-radius: $box-radius;
          box-shadow: $box-shadow;
          transition: box-shadow 0.1s;

          &.is-active {
            border: 2px solid $primary-color;
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

  .main-color-wrap {
    padding-top: 20px;

    .offset {
      display: flex;
      flex-wrap: wrap;
      width: calc(100% + 12.5px);

      $size: 23px;

      > div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: $size;
        height: $size;
        margin: 0 13px 10px 0;
        cursor: pointer;
        border-radius: $size;

        &:last-of-type {
          margin-right: 0;
        }

        i {
          font-size: 14px;
          color: #fff !important;
        }
      }
    }
  }

  .box-style {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px;
    margin-top: 20px;
    background-color: $mason-grey-200;
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
        color: $mason-grey-800;
        background-color: #cccccc;
      }

      &:hover:not(.is-active) {
        color: $mason-grey-800;
        background-color: rgba($color: #000, $alpha: 4%);
      }
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
      border: 2px solid #6b7280;
      border-radius: 10px;

      &:last-of-type {
        margin-right: 0;
      }

      &.is-active {
        border-color: $primary-color;

        i {
          color: #6b7280 !important;
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

  .basic-box {
    position: relative;
    z-index: 10;
    background: transparent !important;

    .item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 35px;
      background: transparent !important;

      span {
        font-size: 14px;
        background: transparent !important;
      }
    }
  }

  &::-webkit-scrollbar {
    width: 0 !important;
  }
}

.dark {
  .drawer-con {
    .box-style {
      .button {
        &.is-active {
          color: #fff !important;
          background-color: rgba(#eee, 0.7);
        }

        &:hover:not(.is-active) {
          background-color: rgba($color: #000, $alpha: 20%);
        }
      }
    }
  }
}

@media screen and (max-width: 783px) {
  .mobile-hide {
    display: none !important;
  }
}
</style>
