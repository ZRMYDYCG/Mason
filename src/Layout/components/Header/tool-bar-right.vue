<template>
  <div class="tool-bar-rt">
    <ThemeSetting></ThemeSetting>
    <FullScreen class="tb-item" />
    <div class="tb-item username">{{ username }}</div>
    <Avatar />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/store/modules/user'
import FullScreen from './components/fullscreen.vue'
import Avatar from './components/avatar.vue'
import ThemeSetting from './components/theme-setting.vue'

const userStore = useUserStore()
const username = computed(() => userStore.userInfo.username)
</script>

<style scoped lang="scss">
.tool-bar-rt {
  display: flex;
  align-items: center;
  justify-content: center;

  .tb-item {
    margin-right: 14px;
  }

  .username {
    font-size: 15px;
    color: var(--el-header-text-color);
  }
}
</style>
