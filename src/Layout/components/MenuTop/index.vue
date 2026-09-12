<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'
import MenuTopSubMenu from '../SubMenu/sub-menu.vue'

const route = useRoute()
const authStore = useAuthStore()
const menuList = computed(() => authStore.showMenuListGet)
const activeMenu = computed(() => route.path)
</script>

<template>
  <div class="menu-top">
    <el-menu
      :ellipsis="true"
      mode="horizontal"
      :default-active="activeMenu"
      :popper-offset="16"
      background-color="transparent"
      text-color="var(--layout-topbar-text, var(--text-primary))"
      active-text-color="var(--layout-tabs-active-text, var(--color-primary))"
      popper-class="menu-top-popup"
    >
      <MenuTopSubMenu :menu-list="menuList" popper-class="menu-top-popup" />
    </el-menu>
  </div>
</template>

<style scoped>
.menu-top {
  display: block;
  flex: 1 1 0;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
}

.menu-top :deep(.el-menu.el-menu--horizontal) {
  width: 100%;
  height: 48px;
  border: none;
  border-bottom: 0;
  background: transparent;
}

.menu-top :deep(.el-menu--horizontal > .el-menu-item),
.menu-top :deep(.el-menu--horizontal > .el-sub-menu .el-sub-menu__title) {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  margin: 0 2px;
  line-height: 36px;
  border-bottom: none !important;
  border-radius: 8px;
}

.menu-top :deep(.el-menu--horizontal > .el-menu-item.is-active),
.menu-top :deep(.el-menu--horizontal > .el-sub-menu.is-active > .el-sub-menu__title) {
  color: var(--layout-tabs-active-text, var(--color-primary)) !important;
  background-color: var(--layout-tabs-active-bg, rgba(var(--color-primary-rgb), 0.14));
}

.menu-top :deep(.el-menu--horizontal > .el-menu-item:not(.is-active):hover),
.menu-top :deep(.el-menu--horizontal > .el-sub-menu:not(.is-active) > .el-sub-menu__title:hover) {
  color: var(--layout-topbar-text, var(--text-primary));
  background-color: var(--fill-secondary);
}
</style>

<style>
.menu-top-popup.el-menu--popup {
  min-width: 168px;
  padding: 6px;
  background-color: var(--bg-surface) !important;
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  box-shadow: var(--shadow-md, 0 12px 32px rgb(28 25 23 / 10%));
}

.menu-top-popup .el-menu-item,
.menu-top-popup .el-sub-menu__title {
  height: 40px;
  margin: 2px 0;
  line-height: 40px;
  border-radius: 8px;
}

.menu-top-popup .el-menu-item.is-active {
  font-weight: 600;
  color: var(--color-primary);
  background-color: rgba(var(--color-primary-rgb), 0.14);
}
</style>
