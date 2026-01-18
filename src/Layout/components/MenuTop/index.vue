<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import { MenuListType } from '@/config'
import { useRoute } from 'vue-router'
import MenuTopSubMenu from '../SubMenu/sub-menu.vue'
import { useAuthStore } from '@/store/modules/auth'

const route = useRoute()

const authStore = useAuthStore()

const menuList = computed(() => authStore.showMenuListGet)

defineProps({
  list: {
    type: [Array] as PropType<MenuListType[]>,
    default: () => []
  },
  width: {
    type: Number,
    default: 500
  }
})

const activeMenu = computed(() => {
  return route.path
})
</script>

<template>
  <div class="menu-top">
    <el-menu
      :ellipsis="true"
      mode="horizontal"
      :default-active="activeMenu"
      :popper-offset="16"
      background-color="transparent"
      text-color="var(--layout-topbar-text, var(--app-text))"
      active-text-color="var(--layout-tabs-active-text, var(--app-text-active))"
      :style="{ width: width + 'px' }"
    >
      <MenuTopSubMenu :menu-list="menuList" />
    </el-menu>
  </div>
</template>

<style scoped>
.menu-top {
  display: flex;
  align-items: center;

  .el-menu {
    border: none;
  }

  :deep(.el-menu--horizontal) {
    display: flex;
    align-items: center;
    height: 55px;
    border-bottom: 0;
  }

  :deep(.el-menu--horizontal > .el-menu-item),
  :deep(.el-menu--horizontal > .el-sub-menu .el-sub-menu__title) {
    display: inline-flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    margin: 0 4px;
    border-radius: 8px;
  }

  :deep(.el-menu--horizontal > .el-menu-item.is-active),
  :deep(.el-menu--horizontal > .el-sub-menu.is-active > .el-sub-menu__title) {
    color: var(--layout-tabs-active-text, var(--app-text-active)) !important;
    background-color: var(--layout-tabs-active-bg, rgba(var(--app-color-primary-rgb), 0.14));
    border-bottom: 0 !important;
  }

  :deep(.el-menu--horizontal > .el-menu-item:not(.is-active):hover),
  :deep(.el-menu--horizontal > .el-sub-menu:not(.is-active) > .el-sub-menu__title:hover) {
    color: var(--layout-topbar-text, var(--app-text));
    background-color: var(--app-fill-light);
  }
}

@media screen and (max-width: 568px) {
  .menu-top {
    .el-menu {
      width: 38vw !important;
    }
  }
}
</style>
