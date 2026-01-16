<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs v-model="tabsMenuValue" type="card" @tab-click="clickTab" @tab-remove="removeTab">
        <el-tab-pane
          v-for="item in tabsMenuList"
          :key="item.path"
          :label="getTitle(item)"
          :name="item.path"
          :closable="item.close"
        >
          <template #label>
            <el-dropdown trigger="contextmenu" placement="bottom-start">
              <span class="tab-label" @contextmenu.prevent>{{ getTitle(item) }}</span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="closeCurrentTab(item)" :disabled="!item.close">
                    <span class="flex items-center justify-center">
                      <AppIcon name="x" class="mr-2" />{{ t('tabs.closeCurrent') }}
                    </span>
                  </el-dropdown-item>
                  <el-dropdown-item @click="tabsStore.closeTabsOnSide(item.path, 'left')">
                    <span class="flex items-center justify-center">
                      <AppIcon name="chevrons-left" class="mr-2" />{{ t('tabs.closeLeft') }}
                    </span>
                  </el-dropdown-item>
                  <el-dropdown-item @click="tabsStore.closeTabsOnSide(item.path, 'right')">
                    <span class="flex items-center justify-center">
                      <AppIcon name="chevrons-right" class="mr-2" />{{ t('tabs.closeRight') }}
                    </span>
                  </el-dropdown-item>
                  <el-dropdown-item @click="tabsStore.closeMultipleTab(item.path)">
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { HOME_URL } from '@/config'
import { useTabsStore } from '@/store/modules/tabs'
import { useAuthStore } from '@/store/modules/auth'
import { useRoute, useRouter } from 'vue-router'
import { TabPaneName, TabsPaneContext } from 'element-plus'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()
const authStore = useAuthStore()
const { t } = useI18n({ useScope: 'global' })

const tabsMenuValue = ref(route.fullPath)
const tabsMenuList = computed(() => tabsStore.tabsMenuList)

const getTitle = (tabItem: any) => {
  const titleKey = tabItem?.titleKey as string | undefined
  const rawTitle = tabItem?.title as string | undefined
  return titleKey ? t(titleKey) : rawTitle
}

onMounted(() => {
  initTabs()
})

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => route.fullPath,
  () => {
    tabsMenuValue.value = route.fullPath
    const tabsParams = {
      icon: route.meta.icon as string,
      title: (route.meta.title as string) ?? '',
      titleKey: route.meta.titleKey as string,
      path: route.fullPath,
      name: route.name as string,
      close: !route.meta.isAffix,
      isKeepAlive: route.meta.isKeepAlive as boolean
    }
    tabsStore.addTab(tabsParams)
  },
  { immediate: true }
)

// 初始化需要固定的 tabs
const initTabs = () => {
  authStore.flatMenuListGet.forEach((item) => {
    if (item.meta.isAffix && item.meta.isEnable) {
      const tabsParams = {
        icon: item.meta.icon,
        title: item.meta.title,
        titleKey: item.meta.titleKey,
        path: item.path,
        name: item.name,
        close: !item.meta.isAffix,
        isKeepAlive: item.meta.isKeepAlive
      }
      tabsStore.addTab(tabsParams)
    }
  })
}

const clickTab = (tabItem: TabsPaneContext) => {
  const fullPath = tabItem.props.name as string
  router.push(fullPath)
}

const removeTab = (fullPath: TabPaneName) => {
  tabsStore.removeTab(fullPath as string, fullPath == route.fullPath)
}

const closeCurrentTab = (tabItem: any) => {
  if (!tabItem?.close) return
  tabsStore.removeTab(tabItem.path, tabItem.path === route.fullPath)
}

const closeAllTab = () => {
  tabsStore.closeMultipleTab()
  router.push(HOME_URL)
}
</script>

<style scoped lang="scss">
.tabs-box {
  background-color: var(--layout-topbar-bg, var(--app-bg-surface));
  color: var(--layout-topbar-text, var(--app-text));
  --el-text-color-primary: var(--layout-topbar-text, var(--app-text));
  --el-text-color-regular: var(--layout-topbar-text, var(--app-text));
  --el-text-color-secondary: var(--layout-topbar-text-secondary, var(--app-text-secondary));

  .tabs-menu {
    position: relative;
    width: 100%;

    :deep(.el-tabs) {
      .el-tabs__header {
        box-sizing: border-box;
        height: 40px;
        padding: 0 10px;
        margin: 0;
        border-bottom: none;

        .el-tabs__nav-wrap {
          position: absolute;
          width: 100%;
          &::after {
            height: 0;
          }

          .el-tabs__nav {
            box-sizing: border-box;
            border: none;

            .el-tabs__item {
              border: none;
              border-left: none;
              height: 28px;
              margin: 6px 4px;
              line-height: 28px;
              border-radius: 8px;
              color: var(--layout-topbar-text, var(--app-text));
              background-color: transparent;
              transition:
                background-color 0.15s ease,
                color 0.15s ease;

              .tab-label {
                color: inherit;
              }

              .el-icon {
                color: inherit;
              }
            }

            .el-tabs__item.is-active {
              color: var(--layout-tabs-active-text, var(--app-text-active)) !important;
              border: none;
              background-color: var(--layout-tabs-active-bg, var(--app-bg-active-light));
            }

            .el-tabs__item:hover {
              color: var(--layout-topbar-text, var(--app-text));
              background-color: var(--app-fill-light);
            }
          }
        }
      }
    }
  }
}
</style>
