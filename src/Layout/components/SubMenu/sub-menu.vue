<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <template #title>
        <AllLucideIcon v-if="subItem.meta.icon" :name="subItem.meta.icon" class="mr-2" />
        <span class="sle">{{ getTitle(subItem.meta) }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <AllLucideIcon v-if="subItem.meta.icon" :name="subItem.meta.icon" class="mr-2" />
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

.el-menu-item.is-active {
  color: #ffffff;
  background-color: var(--el-color-primary);
}
</style>
