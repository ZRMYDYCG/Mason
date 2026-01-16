<template>
  <Tabs v-if="showWorkTab" />
  <el-main v-loading="refresh">
    <div :style="{ width: containerWidth, margin: '0 auto' }">
      <router-view v-slot="{ Component, route }" v-if="isRouterAlive">
        <keep-alive :include="keepAliveNames">
          <transition :name="pageTransition" appear mode="out-in">
            <div :key="route.path">
              <component :is="Component"></component>
            </div>
          </transition>
        </keep-alive>
        <el-backtop target=".el-main" :right="10" :bottom="80" />
      </router-view>
    </div>
  </el-main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import Tabs from '@/Layout/components/Tabs/index.vue'
import { useKeepAliveStore } from '@/store/modules/keepAlive'
import { useDebounceFn } from '@vueuse/core'
import { useGlobalStore } from '@/store/modules/global'
import { useSettingStore } from '@/store/modules/setting.ts'

const keepAliveStore = useKeepAliveStore()
const keepAliveNames = computed(() => keepAliveStore.keepAliveNames)

const globalStore = useGlobalStore()
const settingStore = useSettingStore()
const isCollapse = computed(() => globalStore.isCollapse)
const breadcrumb = computed(() => globalStore.breadcrumb)
const containerWidth = computed(() => settingStore.containerWidth)
const showWorkTab = computed(() => settingStore.showWorkTab)
const pageTransition = computed(() => settingStore.pageTransition)
const isRouterAlive = computed(() => settingStore.isRouterAlive)
const refresh = computed(() => settingStore.refresh)

// 监听窗口大小变化，折叠侧边栏, 控制面包屑导航
const screenWidth = ref(0)
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth
  if (!isCollapse.value && screenWidth.value < 1200) globalStore.setCollapseState(true)
  if (isCollapse.value && screenWidth.value > 1200) globalStore.setCollapseState(false)
  if (breadcrumb.value && screenWidth.value < 768) globalStore.setBreadcrumbState(false)
  if (!breadcrumb.value && screenWidth.value > 768) globalStore.setBreadcrumbState(true)
}, 100)
window.addEventListener('resize', listeningWindow, false)
onBeforeUnmount(() => {
  window.removeEventListener('resize', listeningWindow)
})
</script>

<style scoped lang="scss">
.el-main {
  box-sizing: border-box;
  padding: 10px;
  overflow-x: hidden;
  background-color: var(--el-bg-color-page);
}
</style>
