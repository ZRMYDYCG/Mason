<script setup lang="ts">
import type { PropType } from 'vue'
import type { MenuListType, MenuThemeType } from '@/config'
import ToolBarLeft from '@/Layout/components/Header/tool-bar-left.vue'
import ToolBarRight from '@/Layout/components/Header/tool-bar-right.vue'
import MenuTop from '@/Layout/components/MenuTop/index.vue'
import Main from '@/Layout/components/Main/index.vue'
import Footer from '@/Layout/components/Footer/index.vue'
import Logo from '@/Layout/components/Logo/index.vue'
import LayoutShell from './LayoutShell.vue'

defineProps({
  activeMenu: {
    type: String,
    required: true
  },
  isCollapse: {
    type: Boolean,
    required: true
  },
  uniqueOpened: {
    type: Boolean,
    required: true
  },
  menuTheme: {
    type: Object as PropType<MenuThemeType>,
    required: true
  },
  menuOpenWidth: {
    type: Number,
    required: true
  },
  menuList: {
    type: Array as PropType<MenuListType[]>,
    default: () => []
  },
  fatherMenuList: {
    type: Array as PropType<MenuListType[]>,
    default: () => []
  },
  isFooter: {
    type: Boolean,
    required: true
  },
  handleMouseDown: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: true
  },
  handleMenuJump: {
    type: Function as PropType<(menu: any) => void>,
    required: true
  }
})
</script>

<template>
  <LayoutShell>
    <template #headerLeft>
      <!-- <Logo /> -->
      <ToolBarLeft />
      <MenuTop />
    </template>

    <template #headerRight>
      <ToolBarRight />
    </template>

    <template #main>
      <Main />
    </template>

    <template #footer>
      <Footer v-if="isFooter" />
    </template>
  </LayoutShell>
</template>
