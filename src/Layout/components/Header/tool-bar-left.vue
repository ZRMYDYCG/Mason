<template>
  <div class="tool-bar-lf">
    <CollapseIcon
      v-if="menuType !== MenuTypeEnum.TOP && menuType !== MenuTypeEnum.TOP_LEFT"
      v-show="showMenuButton"
    />
    <Flushed v-if="showRefreshButton" />
    <BreadCrumb
      v-if="menuType !== MenuTypeEnum.TOP && menuType !== MenuTypeEnum.TOP_LEFT && showCrumbs"
      v-show="globalStore.breadcrumb"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MenuTypeEnum } from '@/config'
import CollapseIcon from './components/collapseIcon.vue'
import BreadCrumb from './components/bread-crumb.vue'
import { useGlobalStore } from '@/store/modules/global'
import { useSettingStore } from '@/store/modules/setting.ts'
import Flushed from './components/flushed.vue'

const globalStore = useGlobalStore()
const settingStore = useSettingStore()

const menuType = computed(() => settingStore.menuType)
const showCrumbs = computed(() => settingStore.showCrumbs)
const showMenuButton = computed(() => settingStore.showMenuButton)
const showRefreshButton = computed(() => settingStore.showRefreshButton)
</script>

<style scoped lang="scss">
$mason-grey-300-rgb: rgb(245, 245, 245) !default;

.tool-bar-lf {
  display: flex;
  align-items: center;
}
i {
  display: block;
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    color: var(--mason-grey-700);
    background-color: rgb($mason-grey-300-rgb, 0.5);
    font-weight: bold;
  }
}
</style>
