<template>
  <el-container class="layout">
    <div class="dual-menu-left" v-if="menuType === MenuTypeEnum.DUAL_MENU">
      <div class="logo">
        <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
      </div>
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
              :content="menu?.meta.title"
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
                <i :class="['iconfont', menu?.meta.icon]"></i>
                <div>{{ menu.meta.title }}</div>
              </div>
            </el-tooltip>
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <el-aside
      v-if="
        menuType === MenuTypeEnum.LEFT ||
        menuType === MenuTypeEnum.DUAL_MENU ||
        menuType === MenuTypeEnum.TOP_LEFT
      "
      :style="{ backgroundColor: menuTheme.background, color: menuTheme.textColor }"
    >
      <div class="aside" :style="{ width: isCollapse ? '65px' : `${menuOpenWidth}px` }">
        <Logo />
        <el-scrollbar>
          <el-menu
            :router="false"
            :default-active="activeMenu"
            :collapse="isCollapse"
            :unique-opened="uniqueOpened"
            :collapse-transition="false"
            :background-color="menuTheme.background"
            :active-text-color="menuTheme.textActiveColor"
            :text-color="menuTheme.textColor"
          >
            <SubMenu :menu-list="menuList" />
          </el-menu>
          <!-- 可拖动区域 -->
          <div
            class="absolute right-0 top-0 w-1 h-full cursor-ew-resize bg-transparent"
            @mousedown="handleMouseDown"
            v-if="!isCollapse"
          ></div>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <div class="flex gap-2">
          <Logo v-show="settingStore.menuType === MenuTypeEnum.TOP" />
          <ToolBarLeft />
          <MenuTop v-if="menuType === MenuTypeEnum.TOP" />
          <MenuMixed v-if="menuType === MenuTypeEnum.TOP_LEFT" :list="fatherMenuList" />
        </div>
        <ToolBarRight />
      </el-header>
      <Main />
      <Footer v-if="isFooter" />
    </el-container>
  </el-container>
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
import SubMenu from './components/SubMenu/sub-menu.vue'
import ToolBarLeft from './components/Header/tool-bar-left.vue'
import ToolBarRight from './components/Header/tool-bar-right.vue'
import MenuTop from './components/MenuTop/index.vue'
import Main from './components/Main/index.vue'
import ThemeDrawer from './components/ThemeDrawer/index.vue'
import Footer from './components/Footer/index.vue'
import { useSettingStore } from '@/store/modules/setting.ts'
import Logo from './components/Logo/index.vue'
import MenuMixed from './components/MenuMixed/index.vue'
import Watermark from '@/components/Watermark/index.vue'
import useResizable from '@/hooks/useResizable.ts'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const globalStore = useGlobalStore()
const settingStore = useSettingStore()

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

const { width, handleMouseDown, isDragging } = useResizable(options)

const fatherMenuList = computed(() => {
  return authStore.showMenuListGet || []
})

watch(width, (val) => {
  menuOpenWidth.value = val
})

const menuList = computed(() => {
  if (menuType.value === MenuTypeEnum.DUAL_MENU || menuType.value === MenuTypeEnum.TOP_LEFT) {
    const currentTopPath = `/${route.path.split('/')[1]}`
    const currentMenu = authStore.showMenuListGet.find((menu) => menu.path === currentTopPath)
    return currentMenu?.children.length > 0 ? currentMenu.children : [currentMenu]
  }
  return authStore.showMenuListGet || []
})

const isCollapse = computed(() => globalStore.isCollapse)

const activeMenu = computed(() => route.path)

const handleMenuJump = (menu: any) => {
  if (menu.path === activeMenu.value) return
  router.push(menu.path)
}
</script>

<style scoped lang="scss">
$primary-color: var(--el-color-primary);
.el-container {
  width: 100%;
  height: 100%;
  //user-select: none;
  scrollbar-width: none;

  .dual-menu-left {
    width: 100px;
    height: 100%;
    background-color: var(--el-bg-color-primary);
    border-right: 1px solid var(--el-border-color-light);
    display: flex;
    flex-direction: column;
    align-items: center;

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

  :deep(.el-aside) {
    width: auto;
    border-right: 1px solid var(--el-border-color-light);

    .aside {
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: width 0.3s ease;

      .el-scrollbar {
        height: calc(100% - 55px);
        position: relative;

        .el-menu {
          width: 100%;
          overflow-x: hidden;
          border-right: none;
        }
      }
    }
  }

  .el-header {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    padding: 0 15px;
    border-bottom: 1px solid var(--el-border-color-light);
  }
}
</style>
