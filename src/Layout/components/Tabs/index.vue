<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs v-model="tabsMenuValue" type="card" @tab-click="clickTab" @tab-remove="removeTab">
        <el-tab-pane
          v-for="item in tabsMenuList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
          :closable="item.close"
        >
        </el-tab-pane>
      </el-tabs>
      <MoreButton />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useTabsStore } from '@/store/modules/tabs'
import { useAuthStore } from '@/store/modules/auth'
import { useRoute, useRouter } from 'vue-router'
import { TabPaneName, TabsPaneContext } from 'element-plus'
import MoreButton from './components/more-button.vue'

const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()
const authStore = useAuthStore()

const tabsMenuValue = ref(route.fullPath)
const tabsMenuList = computed(() => tabsStore.tabsMenuList)

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
      title: route.meta.title as string,
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
</script>

<style scoped lang="scss">
.tabs-box {
  background-color: var(--el-bg-color);

  .tabs-menu {
    position: relative;
    width: 100%;

    :deep(.el-tabs) {
      .el-tabs__header {
        box-sizing: border-box;
        height: 40px;
        padding: 0 10px;
        margin: 0;

        .el-tabs__nav-wrap {
          position: absolute;
          width: calc(100% - 70px);

          .el-tabs__nav {
            box-sizing: border-box;
            border: none;

            .el-tabs__item {
              border-bottom: 1px solid transparent;
              border-left: none;
            }

            .el-tabs__item.is-active {
              color: var(--el-color-primary) !important;
              border-bottom: 3px solid var(--el-color-primary);
            }

            .el-tabs__item:hover {
              color: unset;
            }
          }
        }
      }
    }

    .more-btn {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
