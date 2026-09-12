<script setup lang="ts">
import type { PropType } from 'vue'
import type { MenuListType, MenuThemeType } from '@/config'
import SubMenu from '@/Layout/components/SubMenu/sub-menu.vue'
import ToolBarLeft from '@/Layout/components/Header/tool-bar-left.vue'
import ToolBarRight from '@/Layout/components/Header/tool-bar-right.vue'
import GlobalSearch from '@/Layout/components/Header/components/global-search.vue'
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
      <el-aside class="hybrid-aside" :style="{ color: menuTheme.textColor }">
        <div class="aside hybrid-rail">
          <el-scrollbar>
            <el-menu
              :router="false"
              :default-active="activeMenu"
              :collapse="true"
              :unique-opened="uniqueOpened"
              :collapse-transition="false"
              background-color="transparent"
              active-text-color="#ffffff"
              text-color="rgba(255, 255, 255, 0.72)"
            >
              <SubMenu :menu-list="menuList" popper-class="aside-popup-menu" />
            </el-menu>
          </el-scrollbar>
        </div>
      </el-aside>
    </template>

    <template #headerLeft>
      <Logo />
      <ToolBarLeft />
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
.hybrid-aside {
  :deep(.aside.hybrid-rail) {
    width: 72px !important;
    background: #171a22;
  }

  :deep(.el-scrollbar) {
    height: 100%;
  }

  :deep(.el-menu) {
    --el-menu-bg-color: transparent;
    --el-menu-hover-bg-color: rgb(255 255 255 / 8%);

    padding-top: 12px;
    background: transparent;
  }

  :deep(.el-menu-item.is-active),
  :deep(.el-sub-menu.is-active > .el-sub-menu__title) {
    color: #fff !important;
    background-color: rgb(255 255 255 / 12%) !important;
  }

  :deep(.el-menu-item:hover),
  :deep(.el-sub-menu__title:hover) {
    color: #fff !important;
    background-color: rgb(255 255 255 / 8%) !important;
  }
}
</style>
