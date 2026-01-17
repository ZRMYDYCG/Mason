<script setup lang="ts">
import type { PropType } from 'vue'
import type { MenuListType, MenuThemeType } from '@/config'
import SubMenu from '@/Layout/components/SubMenu/sub-menu.vue'
import ToolBarLeft from '@/Layout/components/Header/tool-bar-left.vue'
import ToolBarRight from '@/Layout/components/Header/tool-bar-right.vue'
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
    <template #beforeAside>
      <div class="dual-menu-left">
        <!-- <div class="logo">
          <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
        </div> -->
        <el-scrollbar style="height: calc(100% - 10px)">
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
              background-color="var(--layout-topbar-bg, var(--app-bg-surface))"
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
        </div>
      </el-aside>
    </template>

    <template #headerLeft>
      <ToolBarLeft />
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

<style scoped lang="scss">
$primary-color: var(--el-color-primary);

.dual-menu-left {
  width: 100px;
  height: 100%;
  background-color: var(--layout-topbar-bg, var(--app-bg-surface));
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;

  .logo {
    width: 40px;
    height: 40px;
    margin: 10px 0;

    .logo-img {
      width: 100%;
      height: 100%;
    }
  }

  .item-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    .item {
      width: 100%;
      cursor: pointer;

      .item-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        text-wrap: nowrap;
        border-radius: 5px;
        font-size: 13px;
        padding: 5px;

        &.is-active {
          background-color: $primary-color;
        }
      }
    }
  }
}
</style>
