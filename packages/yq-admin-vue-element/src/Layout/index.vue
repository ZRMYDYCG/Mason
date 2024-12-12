<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
-->
<template>
  <el-container class="layout">
    <el-aside>
      <div class="aside" :style="{ width: isCollapse ? '65px' : '210px' }">
        <div class="logo">
          <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
          <span v-show="!isCollapse" class="logo-text">软件实验室</span>
        </div>
        <el-scrollbar>
          <el-menu
            :router="false"
            :default-active="activeMenu"
            :collapse="isCollapse"
            :unique-opened="true"
            :collapse-transition="false"
          >
            <SubMenu :menu-list="menuList" />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <ToolBarLeft />
        <ToolBarRight />
      </el-header>
      <Main />
      <el-footer class="flex justify-center items-center text-sm text-gray-500">
        @2024 YQ-Admin-ElementPlus
      </el-footer>
    </el-container>
  </el-container>
  <ThemeSetting></ThemeSetting>
  <ThemeDrawer />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'
import { useGlobalStore } from '@/store/modules/global'
import SubMenu from './components/Menu/SubMenu.vue'
import ToolBarLeft from './components/Header/ToolBarLeft.vue'
import ToolBarRight from './components/Header/ToolBarRight.vue'
import Main from './components/Main/index.vue'
import ThemeDrawer from './components/ThemeDrawer/index.vue'
import ThemeSetting from './components/ThemeDrawer/components/ThemeSetting.vue'

const route = useRoute()
const authStore = useAuthStore()
const globalStore = useGlobalStore()

const menuList = computed(() => authStore.showMenuListGet)

const isCollapse = computed(() => globalStore.isCollapse)

const activeMenu = computed(() => route.path)
</script>

<style scoped lang="scss">
.el-container {
  width: 100%;
  height: 100%;

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

        .el-menu {
          width: 100%;
          overflow-x: hidden;
          border-right: none;
        }
      }

      .logo {
        display: flex;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 55px;

        .logo-img {
          position: relative;
          left: -20000px; /* 移动到窗口外很远的地方，也可以用transform: translateY(-20000px); */
          width: 28px;
          height: 28px;
          margin-right: 6px;
          filter: drop-shadow(var(--el-color-primary) 20000px 0);
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
