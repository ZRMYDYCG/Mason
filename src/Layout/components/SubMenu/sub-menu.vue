<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <template #title>
        <svg v-if="subItem.meta.icon" class="icon mr-2 w-4 h-4" aria-hidden="true">
          <use :href="subItem.meta.icon"></use>
        </svg>
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <svg v-if="subItem.meta.icon" class="icon mr-2" aria-hidden="true">
        <use :href="subItem.meta.icon"></use>
      </svg>
      <template #title>
        <div class="flex items-center gap-2">
          <span class="sle mr-2">{{ subItem.meta.title }}</span>
          <div v-if="subItem.meta.isLink" class="w-[10px] h-[10px] bg-red-500 rounded-full"></div>
        </div>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { Menu } from '@/api/interface/system'
import { useRouter } from 'vue-router'

defineProps<{ menuList: Menu[] }>()

const router = useRouter()
const handleClickMenu = (subItem: Menu) => {
  // 是链接时 path为https://
  if (subItem.meta.isLink) return window.open(subItem.path, '_blank')
  router.push(subItem.path)
}
</script>

<style scoped lang="scss">
.menu-icon {
  margin-right: 5px;
  font-size: 18px;
  text-align: center;
  vertical-align: middle;
}

.el-menu-item.is-active {
  color: #ffffff;
  background-color: var(--el-color-primary);
}
</style>
