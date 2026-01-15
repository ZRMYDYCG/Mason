<template>
  <el-dropdown trigger="click" class="more-btn">
    <div class="down-box w-[50px] h-[40px] flx-center">
      <AppIcon name="chevron-down" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="closeCurrentTab">
          <span class="flex items-center justify-center">
            <AppIcon name="x" class="mr-2" />{{ t('tabs.closeCurrent') }}
          </span>
        </el-dropdown-item>
        <el-dropdown-item @click="tabsStore.closeTabsOnSide(route.fullPath, 'left')">
          <span class="flex items-center justify-center">
            <AppIcon name="chevrons-left" class="mr-2" />{{ t('tabs.closeLeft') }}
          </span>
        </el-dropdown-item>
        <el-dropdown-item @click="tabsStore.closeTabsOnSide(route.fullPath, 'right')">
          <span class="flex items-center justify-center">
            <AppIcon name="chevrons-right" class="mr-2" />{{ t('tabs.closeRight') }}
          </span>
        </el-dropdown-item>
        <el-dropdown-item @click="tabsStore.closeMultipleTab(route.fullPath)">
          <span class="flex items-center justify-center">
            <AppIcon name="ellipsis" class="mr-2" />{{ t('tabs.closeOther') }}
          </span>
        </el-dropdown-item>
        <el-dropdown-item @click="closeAllTab">
          <span class="flex items-center justify-center">
            <AppIcon name="x-circle" class="mr-2" />{{ t('tabs.closeAll') }}
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { HOME_URL } from '@/config'
import { useTabsStore } from '@/store/modules/tabs'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const route = useRoute()
const router = useRouter()

const tabsStore = useTabsStore()
const { t } = useI18n({ useScope: 'global' })

const closeCurrentTab = () => {
  if (route.meta?.isAffix) return
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
