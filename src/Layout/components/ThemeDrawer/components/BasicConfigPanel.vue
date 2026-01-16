<script setup lang="ts">
import type { Ref } from 'vue'

type SelectOption = {
  value: string
  label: string
}

type BasicModels = {
  showWorkTab: Ref<boolean>
  uniqueOpened: Ref<boolean>
  showMenuButton: Ref<boolean>
  showRefreshButton: Ref<boolean>
  showCrumbs: Ref<boolean>
  showLanguage: Ref<boolean>
  showNprogress: Ref<boolean>
  colorWeak: Ref<boolean>
  watermarkVisible: Ref<boolean>
  isFooter: Ref<boolean>
  menuOpenWidth: Ref<number>
  pageTransition: Ref<string>
  customRadius: Ref<string>
}

const props = defineProps<{
  models: BasicModels
  pageTransitionOps: SelectOption[]
  customRadiusOps: SelectOption[]
  copyConfig: () => void
}>()

const {
  models,
  pageTransitionOps,
  customRadiusOps,
  copyConfig
} = props

const {
  showWorkTab,
  uniqueOpened,
  showMenuButton,
  showRefreshButton,
  showCrumbs,
  showLanguage,
  showNprogress,
  colorWeak,
  watermarkVisible,
  isFooter,
  menuOpenWidth,
  pageTransition,
  customRadius
} = models
</script>

<template>
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
      <el-switch v-model="colorWeak" />
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
      <el-select v-model="pageTransition" placeholder="Select" size="default" style="width: 120px">
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
      <el-select v-model="customRadius" placeholder="Select" size="default" style="width: 120px">
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

@media screen and (max-width: 783px) {
  .mobile-hide {
    display: none !important;
  }
}
</style>
