<template>
  <div class="tool-bar-rt">
    <GlobalSearch />
    <Notificate />
    <ThemeSetting v-if="showHeaderThemeSetting" />
    <Translate v-if="showLanguage" />
    <Flushed v-if="showRefreshButton" />
    <FullScreen class="tb-item" />
    <ThemeSwitch class="tb-item" />
    <Avatar />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { MenuTypeEnum } from '@/config'
import { useSettingStore } from '@/store/modules/setting'
import FullScreen from './components/fullscreen.vue'
import Avatar from './components/avatar.vue'
import ThemeSetting from './components/theme-setting.vue'
import ThemeSwitch from './components/theme-switch.vue'
import Notificate from './components/notificate.vue'
import Translate from './components/translate.vue'
import Flushed from './components/flushed.vue'
import GlobalSearch from './components/global-search.vue'

const settingStore = useSettingStore()
const { showLanguage, showRefreshButton, menuType } = storeToRefs(settingStore)

/** Classic sidebar already exposes Settings in the aside utility strip */
const showHeaderThemeSetting = computed(() => menuType.value !== MenuTypeEnum.LEFT)
</script>

<style scoped>
.tool-bar-rt {
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: center;
}
</style>
