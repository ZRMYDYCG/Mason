<template>
  <el-dropdown trigger="click" class="more-btn">
    <div class="down-box w-[50px] h-[40px] flx-center">
      <iconpark-icon name="drop-down-list"></iconpark-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="closeCurrentTab">
          <span class="flex items-center justify-center">
            <iconpark-icon name="close-current" class="mr-2"></iconpark-icon>关闭当前</span
          >
        </el-dropdown-item>
        <el-dropdown-item @click="tabsStore.closeTabsOnSide(route.fullPath, 'left')">
          <span class="flex items-center justify-center"
            ><iconpark-icon name="circle-double-left" class="mr-2"></iconpark-icon>关闭左侧</span
          >
        </el-dropdown-item>
        <el-dropdown-item @click="tabsStore.closeTabsOnSide(route.fullPath, 'right')">
          <span class="flex items-center justify-center"
            ><iconpark-icon name="circle-double-right" class="mr-2"></iconpark-icon>关闭右侧</span
          >
        </el-dropdown-item>
        <el-dropdown-item @click="tabsStore.closeMultipleTab(route.fullPath)">
          <span class="flex items-center justify-center"
            ><iconpark-icon name="close-other" class="mr-2"></iconpark-icon>关闭其他</span
          >
        </el-dropdown-item>
        <el-dropdown-item @click="closeAllTab">
          <span class="flex items-center justify-center"
            ><iconpark-icon name="close-all" class="mr-2"></iconpark-icon>关闭全部</span
          >
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { HOME_URL } from '@/config'
import { useTabsStore } from '@/store/modules/tabs'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const tabsStore = useTabsStore()

const closeCurrentTab = () => {
  if (route.meta.isAffix) return
  tabsStore.removeTab(route.fullPath)
}

const closeAllTab = () => {
  tabsStore.closeMultipleTab()
  router.push(HOME_URL)
}
</script>

<style scoped lang="scss">
.down-box {
  border-left: 1px solid var(--el-border-color-light);
}
</style>
