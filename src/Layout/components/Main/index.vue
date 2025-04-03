<template>
  <Tabs v-if="showWorkTab" />
  <el-main v-loading="refresh" :style="{ padding: routeInfo.path === '/mason-ai' ? '0' : '20px' }">
    <!--    <div :style="{ width: containerWidth, margin: '0 auto' }">-->
    <router-view v-slot="{ Component, route }" v-if="isRouterAlive">
      <!--      <transition :name="pageTransition" mode="out-in" appear>-->
      <keep-alive :include="keepAliveNames">
        <component
          :is="createComponentWrapper(Component, route)!"
          :key="route.fullPath"
        ></component>
      </keep-alive>
      <!--      </transition>-->
      <el-backtop target=".el-main" :right="10" :bottom="80" />
    </router-view>
    <!--    </div>-->
  </el-main>
</template>

<script setup lang="ts">
import { VNode, computed, h, onBeforeUnmount, ref } from 'vue'
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import Tabs from '@/Layout/components/Tabs/index.vue'
import { useKeepAliveStore } from '@/store/modules/keepAlive'
import { useDebounceFn } from '@vueuse/core'
import { useGlobalStore } from '@/store/modules/global'
import { useSettingStore } from '@/store/modules/setting.ts'
import { useUserStore } from '@/store/modules/user.ts'

const keepAliveStore = useKeepAliveStore()
const keepAliveNames = computed(() => keepAliveStore.keepAliveNames)

const routeInfo = useRoute()

// keepAlive缓存 将组件路径fullPath作为key 设置为Component 识别名称
const wrapperMap = new Map()
function createComponentWrapper(component: VNode, route: RouteLocationNormalizedLoaded) {
  if (!component) return
  const wrapperName = route.fullPath
  let wrapper = wrapperMap.get(wrapperName)
  if (!wrapper) {
    wrapper = {
      name: route.fullPath,
      render: () => h(component)
    }
    wrapperMap.set(wrapperName, wrapper)
  }
  return h(wrapper)
}

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

const testPiniaStorage = () => {
  useUserStore().userInfo.username = '一个勺子'
}
</script>

<style scoped lang="scss">
.el-main {
  box-sizing: border-box;
  padding: 10px;
  /*消除横移动画出现x轴滚动条*/
  overflow-x: hidden;
  //background-color: var(--el-bg-color-page);
}
</style>
