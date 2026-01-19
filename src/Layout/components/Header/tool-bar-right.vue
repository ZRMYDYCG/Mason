<template>
  <div class="tool-bar-rt">
    <Notificate />
    <ThemeSetting></ThemeSetting>
    <Translate v-if="showLanguage" />
    <Flushed v-if="showRefreshButton" />
    <FullScreen class="tb-item" />
    <ThemeSwitch class="tb-item" />
    <Avatar />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/modules/setting'
import FullScreen from './components/fullscreen.vue'
import Avatar from './components/avatar.vue'
import ThemeSetting from './components/theme-setting.vue'
import ThemeSwitch from './components/theme-switch.vue'
import Notificate from './components/notificate.vue'
import Translate from './components/translate.vue'
import Flushed from './components/flushed.vue'

const settingStore = useSettingStore()
const { showLanguage, showRefreshButton } = storeToRefs(settingStore)
</script>

<style scoped>
.tool-bar-rt {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
}
</style>
