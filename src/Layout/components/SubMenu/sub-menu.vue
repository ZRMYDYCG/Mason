<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path" :popper-class="popperClass">
      <template #title>
        <AllLucideIcon v-if="subItem.meta.icon" :name="subItem.meta.icon" class="icon" />
        <span class="sle">{{ getTitle(subItem.meta) }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" :popper-class="popperClass" />
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

defineProps<{ menuList: Menu[]; popperClass?: string }>()

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

<style scoped>
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
  height: 40px;
  margin: 6px 10px;
  line-height: 40px;
  border-radius: 10px;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

:global(.aside .el-menu--collapse .el-menu-item .icon),
:global(.aside .el-menu--collapse .el-sub-menu__title .icon) {
  display: block;
  width: 18px;
  height: 18px;
  margin-left: -6px;
}

:global(html:not(.dark) .aside .el-menu-item:not(.is-active):hover),
:global(html:not(.dark) .aside .el-sub-menu__title:hover) {
  color: var(--sys-brand);
  background-color: rgba(var(--sys-brand-rgb), 0.08);
}

:global(html.dark .aside .el-menu-item:not(.is-active):hover),
:global(html.dark .aside .el-sub-menu__title:hover) {
  color: var(--sys-brand);
  background-color: rgba(var(--sys-brand-rgb), 0.16);
}

:global(.aside .el-menu-item:not(.is-active):focus-visible),
:global(.aside .el-sub-menu__title:focus-visible) {
  outline: 2px solid rgba(var(--sys-brand-rgb), 0.35);
  outline-offset: -2px;
}

:global(.aside .el-menu-item.is-active) {
  font-weight: 600;
  color: var(--sys-brand);
  background-color: rgba(var(--sys-brand-rgb), 0.14);
}

:global(.aside .el-sub-menu.is-active > .el-sub-menu__title) {
  font-weight: 600;
  color: var(--sys-brand);
  background-color: rgba(var(--sys-brand-rgb), 0.08);
}

/* Aside Popup Menu Styles */
:global(.aside-popup-menu.el-menu--popup) {
  background-color: var(--sys-bg-surface) !important;
}

:global(html:not(.dark) .aside-popup-menu .el-menu-item:not(.is-active):hover),
:global(html:not(.dark) .aside-popup-menu .el-sub-menu__title:hover) {
  color: var(--sys-brand);
  background-color: rgba(var(--sys-brand-rgb), 0.08);
}

:global(html.dark .aside-popup-menu .el-menu-item:not(.is-active):hover),
:global(html.dark .aside-popup-menu .el-sub-menu__title:hover) {
  color: var(--sys-brand);
  background-color: rgba(var(--sys-brand-rgb), 0.16);
}

:global(.aside-popup-menu .el-menu-item.is-active) {
  font-weight: 600;
  color: var(--sys-brand);
  background-color: rgba(var(--sys-brand-rgb), 0.14);
}
</style>
