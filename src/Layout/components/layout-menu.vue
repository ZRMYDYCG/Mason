<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: 
-->
<script setup lang="ts">
import { useUserStore } from '@/store/index'
import LayoutMenuItem from './layout-menu-item.vue'
import type { IMenubarList } from '@/config/interface'

const userStore = useUserStore()

// 过滤隐藏的菜单，并提取单条的子菜单
const filterMenubar = (menuList:IMenubarList[]) => {
    const f = (menuList:IMenubarList[]) => {
        let arr:IMenubarList[] = []
        menuList.filter(v => !v.meta.hidden).forEach(v => {
            let child = v.children && v.children.filter(v => !v.meta.hidden)
            let currentItem = v
            if(!v.meta.alwaysShow && child && child.length === 1) {
                [currentItem] = child
            }
            arr.push(currentItem)
            if(currentItem.children && currentItem.children.length > 0) {
                arr[arr.length - 1].children = f(currentItem.children)
            }
        })
        return arr
    }
    return f(menuList)
}

const filterMenuListData = filterMenubar(userStore.menubar.menuList)
userStore.setRoutes(filterMenuListData)
</script>

<template>
  <el-scrollbar style="width: 100%">
    <el-menu :default-active="1">
      <layout-menu-item :menu-list="userStore.menubar.menuList"></layout-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<style scoped>
:deep(.el-menu) {
  border-right: none;
}
</style>
