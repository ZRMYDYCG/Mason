<template>
  <el-breadcrumb separator="/">
    <template v-for="item in breadcrumbList" :key="item.path">
      <el-breadcrumb-item :to="{ path: item.path } as any" @click="onBreadcrumbClick(item.path)">
        <el-dropdown v-if="hasEnabledChildren(item)" trigger="hover">
          <span class="el-dropdown-link flex items-center gap-1 cursor-pointer">
            <el-text> {{ getTitle(item.meta) }}</el-text>
            <el-icon><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <template v-for="subItem in item.children" :key="subItem.path">
                <el-dropdown-item
                  v-if="subItem.meta?.isEnable"
                  @click="onBreadcrumbClick(subItem.path)"
                >
                  <AppIcon
                    v-if="subItem.meta?.icon"
                    :name="subItem.meta.icon"
                    style="margin-right: 6px"
                  />
                  <span>{{ getTitle(subItem.meta) }}</span>
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-text v-else> {{ getTitle(item.meta) }}</el-text>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { HOME_URL } from '@/config'
import router from '@/router'
import { useAuthStore } from '@/store/modules/auth'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowDown } from '@element-plus/icons-vue'

const authStore = useAuthStore()
const { t } = useI18n({ useScope: 'global' })

const route = useRoute()

const getTitle = (meta: any) => {
  const titleKey = meta?.titleKey as string | undefined
  const rawTitle = meta?.title as string | undefined
  return titleKey ? t(titleKey) : rawTitle
}

const hasEnabledChildren = (item: any) => {
  return item.children?.some((child: any) => child.meta?.isEnable)
}

const breadcrumbList = computed(() => {
  let breadcrumbData = authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path]
  if (breadcrumbData[0].path !== HOME_URL) {
    breadcrumbData = [...breadcrumbData]
  }
  return breadcrumbData
})

const onBreadcrumbClick = (path: string) => {
  if (path === route.path) return
  router.push(path)
}
</script>

<style scoped></style>
