<template>
  <div class="tool-bar-rt">
    <div class="tool-actions">
      <Notificate />
      <ThemeSetting v-if="showHeaderThemeSetting" />
      <Translate v-if="showLanguage" />
      <Flushed v-if="showRefreshButton" />
      <FullScreen class="tb-item" />
      <ThemeSwitch class="tb-item" />
    </div>
    <span class="tool-rule" aria-hidden="true" />
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

const settingStore = useSettingStore()
const { showLanguage, showRefreshButton, menuType } = storeToRefs(settingStore)

/** Classic sidebar already exposes Settings in the aside utility strip */
const showHeaderThemeSetting = computed(() => menuType.value !== MenuTypeEnum.LEFT)
</script>

<style scoped>
.tool-bar-rt {
  display: flex;
  flex-shrink: 0;
  gap: 14px;
  align-items: center;
  justify-content: flex-end;
}

.tool-actions {
  display: flex;
  flex-shrink: 0;
  gap: 12px;
  align-items: center;
}

.tool-rule {
  flex: 0 0 auto;
  width: 1px;
  height: 22px;
  background: var(--border-subtle);
}
</style>
