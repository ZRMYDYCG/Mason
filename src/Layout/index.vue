<template>
  <el-container class="layout">
    <el-aside>
      <div class="aside" :style="{ width: isCollapse ? '65px' : '210px' }">
        <div class="logo">
          <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
          <span v-show="!isCollapse" class="logo-text">Mason • 石匠</span>
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
      <Footer />
    </el-container>
  </el-container>
  <ThemeDrawer />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'
import { useGlobalStore } from '@/store/modules/global'
import SubMenu from './components/Menu/sub-menu.vue'
import ToolBarLeft from './components/Header/tool-bar-left.vue'
import ToolBarRight from './components/Header/tool-bar-right.vue'
import Main from './components/Main/index.vue'
import ThemeDrawer from './components/ThemeDrawer/index.vue'
import Footer from './components/Footer/index.vue'

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
        gap: 10px;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        height: 55px;

        .logo-img {
          width: 30px;
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
