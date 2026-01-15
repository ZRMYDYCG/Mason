<template>
  <div class="tool-bar-rt">
    <ThemeSetting></ThemeSetting>
    <Translate></Translate>
    <FullScreen class="tb-item" />
    <ThemeSwitch class="tb-item" />
    <Notificate />
    <Avatar />
  </div>
</template>

<script setup lang="ts">
import FullScreen from './components/fullscreen.vue'
import Avatar from './components/avatar.vue'
import ThemeSetting from './components/theme-setting.vue'
import ThemeSwitch from './components/theme-switch.vue'
import Notificate from './components/notificate.vue'
import Translate from './components/translate.vue'
</script>

<style scoped lang="scss">
.tool-bar-rt {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
</style>
