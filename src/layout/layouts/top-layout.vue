<script setup lang="ts">
import type { PropType } from 'vue'
import type { MenuListType, MenuThemeType } from '@/config'
import ToolBarLeft from '@/layout/components/header/tool-bar-left.vue'
import ToolBarRight from '@/layout/components/header/tool-bar-right.vue'
import GlobalSearch from '@/layout/components/header/components/global-search.vue'
import MenuTop from '@/layout/components/menu-top/index.vue'
import Main from '@/layout/components/main/index.vue'
import Footer from '@/layout/components/footer/index.vue'
import Logo from '@/layout/components/logo/index.vue'
import LayoutShell from './layout-shell.vue'

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
      <div class="top-brand-nav">
        <Logo />
        <span class="top-brand-nav__rule" aria-hidden="true" />
        <ToolBarLeft />
        <MenuTop />
      </div>
    </template>

    <template #headerCenter>
      <GlobalSearch />
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

<style scoped>
.top-brand-nav {
  display: flex;
  flex: 1 1 auto;
  gap: 4px;
  align-items: center;
  min-width: 0;
}

.top-brand-nav__rule {
  flex: 0 0 auto;
  width: 1px;
  height: 22px;
  margin: 0 10px 0 6px;
  background: var(--border-subtle);
}
</style>
