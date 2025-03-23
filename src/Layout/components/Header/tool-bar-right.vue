<template>
  <div class="tool-bar-rt">
    <ThemeSetting></ThemeSetting>
    <FullScreen class="tb-item" />
    <ThemeSwitch class="tb-item" />
    <Notificate />
    <el-text class="name" type="info" size="small">{{ username }}</el-text>
    <Avatar />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/store/modules/user'
import FullScreen from './components/fullscreen.vue'
import Avatar from './components/avatar.vue'
import ThemeSetting from './components/theme-setting.vue'
import ThemeSwitch from './components/theme-switch.vue'
import Notificate from './components/notificate.vue'

const userStore = useUserStore()
const username = computed(() => userStore.userInfo.username)
</script>

<style scoped lang="scss">
$mason-grey-300-rgb: rgb(245, 245, 245) !default;

.tool-bar-rt {
  display: flex;
  align-items: center;
  justify-content: center;

  .name {
    margin: 0 10px 0 8px;
  }
}

i {
  display: block;
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    color: var(--mason-grey-700);
    background-color: rgb($mason-grey-300-rgb, 0.5);
    font-weight: bold;
  }
}
</style>
