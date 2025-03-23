<template>
  <el-breadcrumb separator="/">
    <template v-for="item in breadcrumbList" :key="item.path">
      <el-breadcrumb-item :to="{ path: item.path } as any" @click="onBreadcrumbClick(item.path)">
        <el-text> {{ item.meta.title }}</el-text>
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

const authStore = useAuthStore()

const route = useRoute()

const breadcrumbList = computed(() => {
  let breadcrumbData = authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path]
  if (breadcrumbData[0].path !== HOME_URL) {
    breadcrumbData = [...breadcrumbData]
  }
  return breadcrumbData
})

const onBreadcrumbClick = (path: string) => {
  router.push(path)
}
</script>

<style scoped lang="scss"></style>
