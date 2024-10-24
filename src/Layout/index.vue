<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: Layout
-->
<script setup lang="ts">
import { PROJECT } from '@/config'
import LayoutMenu from './components/layout-menu.vue'
import LayoutNav from './components/layout-nav.vue'
// import layoutTags from './components/layout-tags.vue'
</script>

<template>
  <div class="layout flex h-screen">
    <div
      class="layout-sidebar flex flex-col h-screen transition-width duration-200 shadow"
      :class="{ 'w-64': true }"
    >
      <div class="layout-logo flex h-12 items-center justify-center">
        <img
          class="layout-sidebar-logo-img w-8 h-8"
          src="/src/assets/logo.svg"
          alt=""
        />
        <span>{{ PROJECT.name }}</span>
      </div>
      <div class="layout-sidebar-menubar flex flex-1 overflow-hidden">
        <layout-menu />
      </div>
    </div>
    <div
      class="layout-main flex flex-1 flex-col overflow-x-hidden overflow-y-auto"
    >
      <div
        class="layout-main-navbar flex justify-between items-center h-12 shadow-sm overflow-hidden relative z-10"
      >
        <layout-nav />
      </div>
      <div class="layout-main-tags">Tags</div>
      <div class="layout-main-content">Content</div>
    </div>
  </div>
</template>

<style scoped></style>
