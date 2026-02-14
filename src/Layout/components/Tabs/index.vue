<template>
  <div class="tabs-box" :class="`tabs-style-${tabsStyle}`">
    <div class="tabs-menu">
      <div class="tabs-scroll" ref="tabsScrollRef">
        <div
          v-for="item in tabsMenuList"
          :key="item.path"
          class="tab-item"
          :class="{ 'is-active': item.path === activePath, 'is-closable': item.close }"
          :ref="(el) => setTabRef(el, item.path)"
          @click="clickTab(item.path)"
        >
          <span class="tab-title" :title="item.title">{{ item.title }}</span>
          <button
            v-if="item.close"
            class="tab-close"
            type="button"
            @click.stop="removeTab(item.path)"
          >
            <AppIcon name="x" :size="14" />
          </button>
        </div>
      </div>
      <MoreButton />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useAuthStore } from '@/store/modules/auth'
import { useTabsStore } from '@/store/modules/tabs'
import { useSettingStore } from '@/store/modules/setting'
import { useRoute, useRouter } from 'vue-router'
import MoreButton from './components/more-button.vue'

const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()
const authStore = useAuthStore()
const settingStore = useSettingStore()

const tabsMenuList = computed(() => tabsStore.tabsMenuList)
const activePath = computed(() => route.fullPath)
const tabsStyle = computed(() => settingStore.tabsStyle)
const tabsScrollRef = ref<HTMLDivElement | null>(null)
const tabRefs = new Map<string, HTMLDivElement>()
let tabsResizeObserver: ResizeObserver | null = null
let scrollRafId: number | null = null

onMounted(() => {
  initTabs()
  scrollActiveTabIntoView()
  setupTabsResizeObserver()
})

onBeforeUnmount(() => {
  tabsResizeObserver?.disconnect()
  tabsResizeObserver = null
  if (scrollRafId !== null) {
    cancelAnimationFrame(scrollRafId)
    scrollRafId = null
  }
})

watch(
  () => route.fullPath,
  () => {
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

watch([activePath, () => tabsMenuList.value.length], () => {
  scrollActiveTabIntoView()
})

const scheduleScrollActiveTabIntoView = () => {
  if (scrollRafId !== null) cancelAnimationFrame(scrollRafId)
  scrollRafId = requestAnimationFrame(() => {
    scrollRafId = null
    scrollActiveTabIntoView()
  })
}

const setupTabsResizeObserver = () => {
  const el = tabsScrollRef.value
  if (!el) return
  if (typeof ResizeObserver === 'undefined') return
  tabsResizeObserver?.disconnect()
  tabsResizeObserver = new ResizeObserver(() => {
    scheduleScrollActiveTabIntoView()
  })
  tabsResizeObserver.observe(el)
}

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

const clickTab = (fullPath: string) => {
  if (fullPath === route.fullPath) return
  router.push(fullPath)
}

const setTabRef = (el: Element | null, path: string) => {
  if (!el) {
    tabRefs.delete(path)
    return
  }
  tabRefs.set(path, el as HTMLDivElement)
}

const scrollActiveTabIntoView = async () => {
  await nextTick()
  const container = tabsScrollRef.value
  const activeEl = tabRefs.get(activePath.value)
  if (!container || !activeEl) return

  const containerRect = container.getBoundingClientRect()
  const activeRect = activeEl.getBoundingClientRect()
  const padding = 12
  const leftOverflow = containerRect.left + padding - activeRect.left
  const rightOverflow = activeRect.right - (containerRect.right - padding)

  if (leftOverflow > 0) {
    container.scrollTo({
      left: Math.max(0, container.scrollLeft - leftOverflow),
      behavior: 'smooth'
    })
    return
  }

  if (rightOverflow > 0) {
    container.scrollTo({
      left: container.scrollLeft + rightOverflow,
      behavior: 'smooth'
    })
  }
}

const removeTab = (fullPath: string) => {
  tabsStore.removeTab(fullPath, fullPath === route.fullPath)
}
</script>

<style scoped>
.tabs-box {
  color: var(--layout-topbar-text, var(--text-primary));
  background-color: var(--layout-topbar-bg, var(--bg-surface));

  .tabs-menu {
    display: flex;
    gap: 8px;
    align-items: center;
    height: 40px;
    padding: 0 10px;

    .tabs-scroll {
      display: flex;
      flex: 1 1 auto;
      gap: 6px;
      align-items: center;
      min-width: 0;
      padding-bottom: 2px;
      overflow: auto hidden;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .tabs-scroll::-webkit-scrollbar {
      display: none;
    }

    .tab-item {
      position: relative;
      display: inline-flex;
      gap: 6px;
      align-items: center;
      height: 30px;
      padding: 0 10px;
      font-size: 13px;
      color: var(--layout-topbar-text-secondary, var(--text-secondary));
      white-space: nowrap;
      cursor: pointer;
      user-select: none;
      background-color: transparent;
      border: 1px solid transparent;
      border-radius: 8px;
      transition:
        color 0.2s ease,
        background-color 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        padding-right 0.2s ease;
    }

    .tab-item:hover {
      color: var(--layout-tabs-active-text, var(--color-primary));
    }

    .tab-item.is-active {
      color: var(--layout-tabs-active-text, var(--color-primary));
    }

    .tab-item.is-closable {
      padding-right: 10px;
    }

    .tab-item.is-closable:hover {
      padding-right: 32px;
    }

    .tab-title {
      line-height: 1;
    }

    .tab-close {
      position: absolute;
      top: 50%;
      right: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      padding: 0;
      color: inherit;
      pointer-events: none;
      cursor: pointer;
      background: transparent;
      border: none;
      border-radius: 999px;
      opacity: 0;
      transition:
        opacity 0.2s ease,
        background-color 0.2s ease;
      transform: translateY(-50%);
    }

    .tab-item:hover .tab-close {
      pointer-events: auto;
      opacity: 1;
    }

    .tab-close:hover {
      background: var(--fill-primary);
    }

    :deep(.more-btn) {
      flex: 0 0 auto;
    }

    :deep(.down-box) {
      border-radius: 8px;
    }
  }

  &.tabs-style-card {
    .tab-item.is-active,
    .tab-item:hover {
      background-color: var(--layout-tabs-active-bg, rgba(var(--color-primary-rgb), 0.14));
      border-color: rgba(var(--color-primary-rgb), 0.35);
      box-shadow: 0 6px 12px rgb(0 0 0 / 8%);
    }
  }

  &.tabs-style-line {
    .tab-item {
      padding: 0 6px;
      background-color: transparent;
      border-color: transparent;
      border-style: solid;
      border-width: 0 0 2px;
      border-radius: 0;
    }

    .tab-item.is-closable:hover {
      padding-right: 30px;
    }

    .tab-item.is-active,
    .tab-item:hover {
      border-color: var(--layout-tabs-active-text, var(--color-primary));
      box-shadow: none;
    }
  }

  &.tabs-style-pill {
    .tab-item {
      background-color: var(--fill-secondary);
      border-color: transparent;
      border-radius: 999px;
    }

    .tab-item.is-active,
    .tab-item:hover {
      background-color: var(--layout-tabs-active-bg, rgba(var(--color-primary-rgb), 0.14));
      border-color: rgba(var(--color-primary-rgb), 0.25);
      box-shadow: 0 6px 12px rgb(0 0 0 / 8%);
    }
  }
}
</style>
