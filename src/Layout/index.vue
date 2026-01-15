<template>
  <component
    :is="layoutComponent"
    :active-menu="activeMenu"
    :is-collapse="isCollapse"
    :unique-opened="uniqueOpened"
    :menu-theme="menuTheme"
    :menu-open-width="menuOpenWidth"
    :menu-list="menuList"
    :father-menu-list="fatherMenuList"
    :is-footer="isFooter"
    :handle-mouse-down="handleMouseDown"
    :handle-menu-jump="handleMenuJump"
    :get-title="getTitle"
  />
  <ThemeDrawer />
  <Watermark :visible="watermarkVisible" />
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { MenuTypeEnum } from '@/config'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'
import { useGlobalStore } from '@/store/modules/global'
import ThemeDrawer from './components/ThemeDrawer/index.vue'
import { useSettingStore } from '@/store/modules/setting.ts'
import Watermark from '@/components/Watermark/index.vue'
import useResizable from '@/hooks/useResizable.ts'
import { useI18n } from 'vue-i18n'
import LeftLayout from '@/Layout/layouts/LeftLayout.vue'
import TopLayout from '@/Layout/layouts/TopLayout.vue'
import TopLeftLayout from '@/Layout/layouts/TopLeftLayout.vue'
import DualMenuLayout from '@/Layout/layouts/DualMenuLayout.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const globalStore = useGlobalStore()
const settingStore = useSettingStore()
const { t } = useI18n({ useScope: 'global' })

const getTitle = (meta: any) => {
  const titleKey = meta?.titleKey as string | undefined
  const rawTitle = meta?.title as string | undefined
  return titleKey ? t(titleKey) : rawTitle
}

const menuType = computed(() => settingStore.menuType)
const watermarkVisible = computed(() => settingStore.watermarkVisible)
const uniqueOpened = computed(() => settingStore.uniqueOpened)
const menuTheme = computed(() => settingStore.getMenuTheme)
const isFooter = computed(() => settingStore.isFooter)
const { menuOpenWidth } = storeToRefs(settingStore)

const options = {
  minWidth: 200,
  maxWidth: 400,
  initialWidth: menuOpenWidth.value
}

const { width, handleMouseDown } = useResizable(options)

const fatherMenuList = computed(() => {
  return authStore.showMenuListGet || []
})

watch(width, (val) => {
  menuOpenWidth.value = val
})

const menuList = computed(() => {
  const list = authStore.showMenuListGet || []

  if (menuType.value === MenuTypeEnum.DUAL_MENU || menuType.value === MenuTypeEnum.TOP_LEFT) {
    const currentTopPath = `/${route.path.split('/')[1]}`
    const currentMenu = list.find((menu) => menu.path === currentTopPath)

    if (!currentMenu) return []
    if (currentMenu.children?.length) return currentMenu.children
    return [currentMenu]
  }

  return list
})

const isCollapse = computed(() => globalStore.isCollapse)

const activeMenu = computed(() => route.path)

const handleMenuJump = (menu: any) => {
  if (menu.path === activeMenu.value) return
  router.push(menu.path)
}

const layoutComponent = computed(() => {
  switch (menuType.value) {
    case MenuTypeEnum.TOP:
      return TopLayout
    case MenuTypeEnum.TOP_LEFT:
      return TopLeftLayout
    case MenuTypeEnum.DUAL_MENU:
      return DualMenuLayout
    case MenuTypeEnum.LEFT:
    default:
      return LeftLayout
  }
})
</script>
