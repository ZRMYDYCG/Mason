<script setup lang="ts">
import type { PropType } from 'vue'
import type { MenuListType, MenuThemeType } from '@/config'
import SubMenu from '@/Layout/components/SubMenu/sub-menu.vue'
import ToolBarLeft from '@/Layout/components/Header/tool-bar-left.vue'
import ToolBarRight from '@/Layout/components/Header/tool-bar-right.vue'
import MenuMixed from '@/Layout/components/MenuMixed/index.vue'
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
  },
  getTitle: {
    type: Function as PropType<(meta: any) => string | undefined>,
    required: true
  }
})
</script>

<template>
  <LayoutShell>
    <template #aside>
      <el-aside :style="{ color: menuTheme.textColor }">
        <div class="aside" :style="{ width: isCollapse ? '65px' : `${menuOpenWidth}px` }">
          <Logo />
          <el-scrollbar>
            <el-menu
              :router="false"
              :default-active="activeMenu"
              :collapse="isCollapse"
              :unique-opened="uniqueOpened"
              :collapse-transition="false"
              background-color="var(--layout-topbar-bg, var(--app-bg-surface))"
              :active-text-color="menuTheme.textActiveColor"
              :text-color="menuTheme.textColor"
            >
              <SubMenu :menu-list="menuList" />
            </el-menu>
            <div
              class="absolute right-0 top-0 w-1 h-full cursor-ew-resize bg-transparent"
              @mousedown="handleMouseDown"
              v-if="!isCollapse"
            ></div>
          </el-scrollbar>
        </div>
      </el-aside>
    </template>

    <template #headerLeft>
      <ToolBarLeft />
      <MenuMixed :list="fatherMenuList" />
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
