<script setup lang="ts">
import type { PropType } from 'vue'
import type { MenuListType, MenuThemeType } from '@/config'
import SubMenu from '@/Layout/components/SubMenu/sub-menu.vue'
import ToolBarLeft from '@/Layout/components/Header/tool-bar-left.vue'
import ToolBarRight from '@/Layout/components/Header/tool-bar-right.vue'
import GlobalSearch from '@/Layout/components/Header/components/global-search.vue'
import Main from '@/Layout/components/Main/index.vue'
import Footer from '@/Layout/components/Footer/index.vue'
import BrandCard from '@/Layout/components/BrandCard/index.vue'
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
    <template #beforeAside>
      <div class="dual-menu-left">
        <Logo />
        <el-scrollbar>
          <ul class="item-wrapper">
            <li
              class="item"
              v-for="menu in fatherMenuList"
              :key="menu?.path"
              @click="handleMenuJump(menu)"
            >
              <el-tooltip
                effect="dark"
                :content="menu ? getTitle(menu.meta) : ''"
                placement="right"
                :offset="25"
                :hide-after="0"
              >
                <div
                  :class="[
                    {
                      'is-active': menu?.path.replace('/', '') === activeMenu.split('/')[1]
                    },
                    'item-content'
                  ]"
                >
                  <AllLucideIcon v-if="menu?.meta.icon" :name="menu.meta.icon" />
                  <div>{{ getTitle(menu.meta) }}</div>
                </div>
              </el-tooltip>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </template>

    <template #aside>
      <el-aside :style="{ color: menuTheme.textColor }">
        <div class="aside" :style="{ width: isCollapse ? '65px' : `${menuOpenWidth}px` }">
          <el-scrollbar>
            <el-menu
              :router="false"
              :default-active="activeMenu"
              :collapse="isCollapse"
              :unique-opened="uniqueOpened"
              :collapse-transition="false"
              background-color="var(--layout-topbar-bg, var(--bg-surface))"
              :active-text-color="menuTheme.textActiveColor"
              :text-color="menuTheme.textColor"
            >
              <SubMenu :menu-list="menuList" popper-class="aside-popup-menu" />
            </el-menu>
            <div
              class="absolute right-0 top-0 w-1 h-full cursor-ew-resize bg-transparent"
              @mousedown="handleMouseDown"
              v-if="!isCollapse"
            ></div>
          </el-scrollbar>
          <BrandCard />
        </div>
      </el-aside>
    </template>

    <template #headerLeft>
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
.dual-menu-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  height: 100%;
  background-color: var(--layout-topbar-bg, var(--bg-surface));
  border-right: 1px solid var(--border-subtle);

  :deep(.logo) {
    width: 100%;
    height: 64px;
    padding: 0;
  }

  :deep(.el-scrollbar) {
    flex: 1 1 auto;
    width: 100%;
    min-height: 0;
  }

  .item-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    padding: 4px 0 12px;

    .item {
      width: 100%;
      cursor: pointer;

      .item-content {
        display: flex;
        flex-direction: column;
        gap: 3px;
        align-items: center;
        padding: 8px 5px;
        font-size: 12px;
        text-wrap: nowrap;
        border-radius: 10px;

        &.is-active {
          color: var(--color-primary);
          background-color: rgba(var(--color-primary-rgb), 0.14);
        }
      }
    }
  }
}
</style>
