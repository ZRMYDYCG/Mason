<script setup lang="ts">
import { computed } from 'vue'
import { MenuTypeEnum, HOME_URL, MenuThemeEnum } from '@/config'
import { useGlobalStore } from '@/store/modules/global'
import { useSettingStore } from '@/store/modules/setting.ts'
import { useRouter } from 'vue-router'
import logoMark from '@/assets/images/logo.png'
import logoWordmark from '@/assets/images/logo-wordmark.png'
import logoWordmarkOnDark from '@/assets/images/logo-wordmark-on-dark.png'

const globalStore = useGlobalStore()
const settingStore = useSettingStore()
const router = useRouter()

const isCollapse = computed(() => globalStore.isCollapse)
const menuType = computed(() => settingStore.menuType)
const isDark = computed(() => settingStore.isDark)
const menuTheme = computed(() => settingStore.getMenuTheme)

/** Expanded sidebar / header: show full wordmark (icon + text) */
const showWordmark = computed(() => {
  if (menuType.value === MenuTypeEnum.DUAL_MENU) return false
  if (menuType.value === MenuTypeEnum.TOP || menuType.value === MenuTypeEnum.TOP_LEFT) return true
  return !isCollapse.value
})

/** Classic sidebar gets a roomier brand block */
const isAsideBrand = computed(
  () => menuType.value === MenuTypeEnum.LEFT && showWordmark.value
)

const wordmarkSrc = computed(() => {
  const darkMenu = menuTheme.value.theme === MenuThemeEnum.DARK
  return isDark.value || darkMenu ? logoWordmarkOnDark : logoWordmark
})

const goHome = () => {
  router.push(HOME_URL)
}
</script>

<template>
  <button
    type="button"
    class="logo"
    :class="{
      compact: !showWordmark,
      wordmark: showWordmark,
      'aside-brand': isAsideBrand
    }"
    @click="goHome"
  >
    <img
      v-if="showWordmark"
      class="logo-wordmark"
      :src="wordmarkSrc"
      alt="Mason — Build A Better Tomorrow"
    />
    <img v-else class="logo-mark" :src="logoMark" alt="Mason" />
  </button>
</template>

<style scoped>
.logo {
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  width: 100%;
  max-width: 100%;
  height: 64px;
  padding: 0 16px;
  cursor: pointer;
  background: transparent;
  border: none;
  transition: opacity 0.15s ease;
}

.logo:hover {
  opacity: 0.88;
}

.logo:focus-visible {
  outline: 2px solid rgba(var(--color-primary-rgb), 0.35);
  outline-offset: -2px;
}

.logo.compact {
  justify-content: center;
  width: auto;
  padding: 0;
}

/* Header wordmark (top / hybrid): shrink-wrap, never stretch the bar */
.logo.wordmark:not(.aside-brand) {
  width: auto;
  max-width: 140px;
  height: 48px;
  padding: 0 4px 0 0;
}

.logo.wordmark:not(.aside-brand) .logo-wordmark {
  height: 26px;
}

/* Classic sidebar: airy brand zone matching the design board */
.logo.aside-brand {
  height: auto;
  min-height: 92px;
  padding: 32px 22px 20px;
}

.logo-mark {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 8px;
}

.logo-wordmark {
  display: block;
  width: auto;
  max-width: 100%;
  height: 36px;
  object-fit: contain;
  object-position: left center;
}

.logo.aside-brand .logo-wordmark {
  height: 44px;
}
</style>
