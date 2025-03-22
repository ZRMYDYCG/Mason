<template>
  <div class="tool-bar-lf">
    <CollapseIcon v-if="menuType !== MenuTypeEnum.TOP && menuType !== MenuTypeEnum.TOP_LEFT" />
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

const globalStore = useGlobalStore()
const settingStore = useSettingStore()

const menuType = computed(() => settingStore.menuType)

const showCrumbs = computed(() => settingStore.showCrumbs)
</script>

<style scoped lang="scss">
.tool-bar-lf {
  display: flex;
  align-items: center;
}
</style>
