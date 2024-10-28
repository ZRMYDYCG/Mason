<script setup lang="ts">
import { onMounted } from 'vue'
import type { IMenubarList } from '@/config/interface'
const props = defineProps<{ menuList: IMenubarList }>()

onMounted(() => {
  console.log(props.menuList)
})
</script>

<template>
  <el-sub-menu v-if="menuList.children && menuList.children.length > 0">
    <template #title>
      <span>{{ menuList.meta.title }}</span>
    </template>
    <el-menu-item-group>
      <layout-menu-item
        v-for="item in menuList.children"
        :key="item.path"
        :menu-list="item"
        :index="item.path"
      />
    </el-menu-item-group>
  </el-sub-menu>
  <el-menu-item v-else :index="menuList.path" :key="menuList.path">
    <template #title>
      {{ menuList.meta.title }}
    </template>
  </el-menu-item>
</template>

<style scoped></style>
