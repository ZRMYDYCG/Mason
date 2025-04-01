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
      :style="{ width: width + 'px' }"
    >
      <MenuTopSubMenu :menu-list="menuList" />
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-menu--horizontal > .el-sub-menu.is-active .el-sub-menu__title) {
  border: 0 !important;
}

.menu-top {
  .el-menu {
    border: none;
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
