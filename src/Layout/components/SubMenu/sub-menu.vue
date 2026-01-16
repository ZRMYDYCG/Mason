<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <template #title>
        <AllLucideIcon v-if="subItem.meta.icon" :name="subItem.meta.icon" class="icon" />
        <span class="sle">{{ getTitle(subItem.meta) }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <AllLucideIcon v-if="subItem.meta.icon" :name="subItem.meta.icon" class="icon" />
      <template #title>
        <div class="flex items-center gap-2">
          <span class="sle mr-2">{{ getTitle(subItem.meta) }}</span>
          <div v-if="subItem.meta.isLink" class="w-[10px] h-[10px] bg-red-500 rounded-full"></div>
        </div>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { Menu } from '@/api/interface/system'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

defineProps<{ menuList: Menu[] }>()

const router = useRouter()
const { t } = useI18n({ useScope: 'global' })

const getTitle = (meta: any) => {
  const titleKey = meta?.titleKey as string | undefined
  const rawTitle = meta?.title as string | undefined
  return titleKey ? t(titleKey) : rawTitle
}

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

:global(.aside .el-menu) {
  padding: 6px 0;
  border-right: 0;
}

:global(.aside .el-menu-item),
:global(.aside .el-sub-menu__title) {
  position: relative;
  margin: 6px 10px;
  border-radius: 10px;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

:global(.aside .el-sub-menu__title),
:global(.aside .el-menu-item) {
  height: 40px;
  line-height: 40px;
}

:global(.aside .el-menu--collapse .el-menu-item .icon),
:global(.aside .el-menu--collapse .el-sub-menu__title .icon) {
  margin-left: -6px;
}

:global(html:not(.dark) .aside .el-menu-item:not(.is-active):hover),
:global(html:not(.dark) .aside .el-sub-menu__title:hover) {
  color: var(--app-text-active);
  background-color: rgba(var(--app-color-primary-rgb), 0.08);
}

:global(html.dark .aside .el-menu-item:not(.is-active):hover),
:global(html.dark .aside .el-sub-menu__title:hover) {
  color: var(--app-text-active);
  background-color: rgba(var(--app-color-primary-rgb), 0.16);
}

:global(.aside .el-menu-item:not(.is-active):focus-visible),
:global(.aside .el-sub-menu__title:focus-visible) {
  outline: 2px solid rgba(var(--app-color-primary-rgb), 0.35);
  outline-offset: -2px;
}

:global(.aside .el-menu-item.is-active) {
  color: var(--app-text-active);
  background-color: rgba(var(--app-color-primary-rgb), 0.14);
  font-weight: 600;
}

:global(.aside .el-sub-menu.is-active > .el-sub-menu__title) {
  color: var(--app-text-active);
  background-color: rgba(var(--app-color-primary-rgb), 0.08);
  font-weight: 600;
}
</style>
