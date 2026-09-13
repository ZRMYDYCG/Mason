<script setup lang="ts">
import { computed } from 'vue'
import { useSettingStore } from '@/store/modules/setting'
import { HeaderChromeEnum, MenuThemeEnum, MenuTypeEnum } from '@/config'
import Tabs from '@/layout/components/tabs/index.vue'
import atmosphereImg from '@/assets/images/layout/header-atmosphere.png'

const settingStore = useSettingStore()
const menuTheme = computed(() => settingStore.getMenuTheme)
const isSystemDark = computed(() => settingStore.isDark)
const headerChrome = computed(() => settingStore.headerChrome || HeaderChromeEnum.ATMOSPHERE)
const menuType = computed(() => settingStore.menuType)
const showWorkTab = computed(() => settingStore.showWorkTab)

const isAtmosphere = computed(() => headerChrome.value === HeaderChromeEnum.ATMOSPHERE)
const isSoft = computed(() => headerChrome.value === HeaderChromeEnum.SOFT)
const isClassicLeft = computed(() => menuType.value === MenuTypeEnum.LEFT)
/** Dark menu style or system dark — chrome (header + aside) uses night-mode treatment */
const isChromeDark = computed(
  () => isSystemDark.value || menuTheme.value.theme === MenuThemeEnum.DARK
)

const topbarBg = computed(() => menuTheme.value.tabBarBackground)
const topbarTextColor = computed(() =>
  isChromeDark.value
    ? 'var(--layout-chrome-dark-text-primary)'
    : menuTheme.value.textColor
)
const topbarTextSecondaryColor = computed(() =>
  isChromeDark.value
    ? 'var(--layout-chrome-dark-text)'
    : menuTheme.value.systemNameColor
)
const tabsActiveBg = computed(() => 'rgba(var(--color-primary-rgb), 0.14)')
const tabsActiveText = computed(() => 'var(--color-primary)')
</script>

<template>
  <el-container
    class="layout"
    :class="{
      'is-chrome-atmosphere': isAtmosphere,
      'is-chrome-soft': isSoft,
      'is-chrome-dark': isChromeDark,
      'is-layout-left': isClassicLeft,
      'is-layout-top': menuType === MenuTypeEnum.TOP,
      'is-layout-hybrid': menuType === MenuTypeEnum.TOP_LEFT || menuType === MenuTypeEnum.DUAL_MENU,
      'has-work-tab': showWorkTab
    }"
    :style="{
      '--layout-topbar-bg': topbarBg,
      '--layout-topbar-text': topbarTextColor,
      '--layout-topbar-text-secondary': topbarTextSecondaryColor,
      '--layout-tabs-active-bg': tabsActiveBg,
      '--layout-tabs-active-text': tabsActiveText,
      '--layout-atmosphere-image': `url(${atmosphereImg})`
    }"
  >
    <slot name="beforeAside" />
    <slot name="aside" />
    <el-container class="layout-body">
      <el-header class="layout-chrome" height="auto">
        <div v-if="isAtmosphere && isClassicLeft" class="layout-chrome__media" aria-hidden="true" />
        <div v-if="isAtmosphere && isClassicLeft" class="layout-chrome__fade" aria-hidden="true" />
        <p v-if="isAtmosphere && isClassicLeft" class="layout-chrome__tagline">
          Build A Better Tomorrow
        </p>

        <div class="layout-header">
          <div class="layout-header__left">
            <slot name="headerLeft" />
          </div>
          <div class="layout-header__center">
            <slot name="headerCenter" />
          </div>
          <div class="layout-header__right">
            <slot name="headerRight" />
          </div>
        </div>

        <Tabs v-if="showWorkTab" />
      </el-header>

      <slot name="main" />
      <slot name="footer" />
    </el-container>
  </el-container>
  <slot name="overlay" />
</template>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
  scrollbar-width: none;

  :deep(.el-aside) {
    width: auto;
    background-color: var(--layout-topbar-bg, var(--bg-surface));
    border-right: 1px solid var(--border-subtle);
  }

  :deep(.el-aside .aside) {
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: width 0.3s ease;
  }

  :deep(.el-aside .aside .el-scrollbar) {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
  }

  :deep(.el-aside .aside .el-scrollbar .el-menu) {
    width: 100%;
    overflow-x: hidden;
    border-right: none;
  }
}

.layout-body {
  min-width: 0;
  background-color: var(--el-bg-color-page);
}

.layout-chrome {
  position: relative;
  z-index: 20;
  flex: 0 0 auto;
  height: auto !important;
  padding: 0;
  overflow: hidden;
  color: var(--layout-topbar-text, var(--text-primary));
  background-color: var(--layout-topbar-bg, var(--bg-surface));
  border-bottom: 1px solid var(--border-subtle);

  --el-text-color-primary: var(--layout-topbar-text, var(--text-primary));
  --el-text-color-regular: var(--layout-topbar-text, var(--text-primary));
  --el-text-color-secondary: var(--layout-topbar-text-secondary, var(--text-secondary));
}

.layout-chrome__media,
.layout-chrome__fade,
.layout-chrome__tagline {
  display: none;
}

.layout-header {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 16px;
  align-items: center;
  min-height: 58px;
  padding: 0 18px;
}

.layout-header__left {
  display: flex;
  flex: 0 1 auto;
  gap: 12px;
  align-items: center;
  min-width: 0;
}

.layout-header__center {
  display: flex;
  flex: 1 1 280px;
  align-items: center;
  min-width: 0;
  max-width: 420px;
}

.layout-header__center :deep(.global-search) {
  width: 100%;
  max-width: 100%;
}

.layout-header__center :deep(.global-search-trigger) {
  width: 100%;
  min-width: 0;
  max-width: none;
}

.layout-header__right {
  display: flex;
  flex: 0 0 auto;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
  min-width: 0;
}

.layout-chrome :deep(.tabs-box) {
  position: relative;
  z-index: 1;
  background-color: transparent;
  border-top: 1px solid var(--border-subtle);
}

/*
 * Dark chrome (dark menu style or night mode): remap local semantics on header/aside only
 * so children keep using --border-* / --fill-* but resolve like html.dark.
 * Do NOT set these on .layout itself — that would darken the content pane.
 */
.layout.is-chrome-dark :deep(.el-aside),
.layout.is-chrome-dark :deep(.dual-menu-left),
.layout.is-chrome-dark .layout-chrome {
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-light: rgba(255, 255, 255, 0.1);
  --border-default: rgba(255, 255, 255, 0.15);
  --border-default-hover: rgba(255, 255, 255, 0.2);
  --fill-primary: rgba(255, 255, 255, 0.06);
  --fill-primary-subtle: rgba(255, 255, 255, 0.03);
  --fill-secondary: rgba(255, 255, 255, 0.12);
  --fill-tertiary: rgba(255, 255, 255, 0.18);
  --bg-surface: var(--layout-chrome-dark-bg);
  --bg-surface-hover: #141414;
  --text-primary: var(--layout-chrome-dark-text-primary);
  --text-secondary: var(--layout-chrome-dark-text);
  --text-tertiary: var(--layout-chrome-dark-text);
  --shadow-color: rgba(0, 0, 0, 0.4);
}

/* Classic left: crumbs stay compact; search owns the middle */
.layout.is-layout-left .layout-header__center {
  flex: 1 1 300px;
  max-width: 440px;
}

/* Top: brand + nav consume left space; search stays compact */
.layout.is-layout-top .layout-header {
  gap: 14px;
}

.layout.is-layout-top .layout-header__left {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
}

.layout.is-layout-top .layout-header__center {
  flex: 0 1 220px;
  max-width: 240px;
}

.layout.is-layout-top .layout-header__right {
  margin-left: 0;
}

.layout.is-layout-top :deep(.menu-top) {
  flex: 0 1 auto;
  min-width: 0;
}

.layout.is-layout-top :deep(.menu-top .el-menu) {
  width: auto !important;
  max-width: 100%;
}

.layout.is-layout-top :deep(.tool-bar-rt) {
  gap: 10px;
}

/* Hybrid: logo + crumbs left; search medium */
.layout.is-layout-hybrid .layout-header__left {
  overflow: hidden;
}

.layout.is-layout-hybrid .layout-header__center {
  flex: 1 1 240px;
  max-width: 320px;
}

/* —— Atmosphere —— */
.layout.is-chrome-atmosphere .layout-chrome {
  border-bottom-color: transparent;
  box-shadow: 0 10px 30px rgb(28 25 23 / 4%);
}

.layout.is-chrome-atmosphere .layout-chrome__media {
  position: absolute;
  inset: 0 0 0 48%;
  display: block;
  pointer-events: none;
  background-image: var(--layout-atmosphere-image);
  background-repeat: no-repeat;
  background-position: right center;
  background-size: cover;
}

.layout.is-chrome-atmosphere .layout-chrome__fade {
  position: absolute;
  inset: 0;
  display: block;
  pointer-events: none;
  background:
    linear-gradient(
      90deg,
      var(--layout-topbar-bg, var(--bg-surface)) 0%,
      var(--layout-topbar-bg, var(--bg-surface)) 42%,
      color-mix(in srgb, var(--layout-topbar-bg, var(--bg-surface)) 82%, transparent) 58%,
      transparent 78%
    ),
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--layout-topbar-bg, var(--bg-surface)) 18%, transparent) 0%,
      transparent 40%,
      color-mix(in srgb, var(--layout-topbar-bg, var(--bg-surface)) 28%, transparent) 100%
    );
}

.layout.is-chrome-atmosphere.is-layout-left .layout-chrome__tagline {
  position: absolute;
  right: 28px;
  bottom: 18px;
  z-index: 0;
  display: block;
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: rgb(55 48 40 / 42%);
  letter-spacing: 0.04em;
  pointer-events: none;
  user-select: none;
}

.layout.is-chrome-atmosphere .layout-header {
  min-height: 64px;
  padding-top: 8px;
  padding-bottom: 4px;
}

.layout.is-chrome-atmosphere .layout-chrome :deep(.tabs-box) {
  border-top-color: transparent;
}

.layout.is-chrome-atmosphere.is-layout-left .layout-chrome :deep(.tabs-menu) {
  padding-right: 200px;
  padding-bottom: 8px;
}

/* Atmosphere + classic left: glass search in the center zone */
.layout.is-chrome-atmosphere.is-layout-left .layout-header__center :deep(.global-search-trigger) {
  height: 40px;
  background-color: rgb(255 255 255 / 72%);
  backdrop-filter: blur(14px) saturate(140%);
  border-color: rgb(255 255 255 / 55%);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 70%),
    0 8px 24px rgb(28 25 23 / 6%);
}

.layout.is-chrome-atmosphere.is-layout-left
  .layout-header__center
  :deep(.global-search-trigger:hover) {
  background-color: rgb(255 255 255 / 88%);
  border-color: rgb(255 255 255 / 80%);
}

/*
 * Top / hybrid + atmosphere:
 * keep readable solid chrome (no photo). Atmosphere photo is for classic left only.
 */
.layout.is-chrome-atmosphere.is-layout-top .layout-chrome,
.layout.is-chrome-atmosphere.is-layout-hybrid .layout-chrome {
  background: var(--layout-topbar-bg, var(--bg-surface));
  border-bottom-color: var(--border-subtle);
  box-shadow: 0 1px 0 var(--border-subtle);
}

.layout.is-chrome-atmosphere.is-layout-top .layout-header,
.layout.is-chrome-atmosphere.is-layout-hybrid .layout-header {
  min-height: 56px;
  padding-top: 0;
  padding-bottom: 0;
}

/* —— Soft (modern soft) —— */
.layout.is-chrome-soft .layout-chrome {
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--layout-topbar-bg, var(--bg-surface)) 92%, #f3efe8) 0%,
    var(--layout-topbar-bg, var(--bg-surface)) 100%
  );
  border-bottom-color: transparent;
  box-shadow: 0 1px 0 var(--border-subtle);
}

.layout.is-chrome-soft .layout-header {
  min-height: 56px;
}

.layout.is-chrome-soft .layout-chrome :deep(.tabs-box) {
  border-top-color: transparent;
}

.layout.is-chrome-soft .layout-chrome :deep(.tabs-menu) {
  height: 44px;
  padding-top: 2px;
  padding-bottom: 8px;
}

.layout.is-chrome-soft .layout-chrome :deep(.tab-item) {
  height: 32px;
  border-radius: 999px;
}

.layout.is-chrome-soft .layout-chrome :deep(.tabs-style-card .tab-item.is-active),
.layout.is-chrome-soft .layout-chrome :deep(.tabs-style-card .tab-item:hover),
.layout.is-chrome-soft .layout-chrome :deep(.tabs-style-pill .tab-item.is-active),
.layout.is-chrome-soft .layout-chrome :deep(.tabs-style-pill .tab-item:hover) {
  background-color: var(--layout-tabs-active-bg, rgba(var(--color-primary-rgb), 0.14));
  border-color: transparent;
  box-shadow: 0 4px 12px rgb(28 25 23 / 6%);
}

.layout.is-chrome-soft .layout-header__center :deep(.global-search-trigger) {
  height: 36px;
  background-color: var(--fill-primary);
  border-color: transparent;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 55%);
}

.layout.is-chrome-dark.is-chrome-atmosphere .layout-chrome__media {
  opacity: 0.42;
}

.layout.is-chrome-dark.is-chrome-atmosphere.is-layout-left .layout-chrome__tagline {
  color: rgb(255 255 255 / 38%);
}

.layout.is-chrome-dark.is-chrome-atmosphere.is-layout-left
  .layout-header__center
  :deep(.global-search-trigger) {
  background-color: rgb(15 15 15 / 55%);
  border-color: rgb(255 255 255 / 10%);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 8%);
}

.layout.is-chrome-dark.is-chrome-atmosphere.is-layout-left
  .layout-header__center
  :deep(.global-search-trigger:hover) {
  background-color: rgb(15 15 15 / 72%);
  border-color: rgb(255 255 255 / 16%);
}

.layout.is-chrome-dark.is-chrome-soft .layout-chrome {
  background: var(--layout-topbar-bg, var(--bg-surface));
}

.layout.is-chrome-dark.is-chrome-soft .layout-header__center :deep(.global-search-trigger) {
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 8%);
}

@media (prefers-reduced-transparency: reduce) {
  .layout.is-chrome-atmosphere.is-layout-left .layout-header__center :deep(.global-search-trigger) {
    background-color: var(--bg-surface);
    backdrop-filter: none;
  }
}

@media screen and (width <= 1200px) {
  .layout.is-chrome-atmosphere .layout-chrome__media {
    inset: 0 0 0 65%;
  }

  .layout.is-chrome-atmosphere.is-layout-left .layout-chrome__tagline {
    display: none;
  }

  .layout.is-chrome-atmosphere.is-layout-left .layout-chrome :deep(.tabs-menu) {
    padding-right: 12px;
  }

  .layout.is-layout-left .layout-header__center,
  .layout.is-layout-hybrid .layout-header__center {
    max-width: 280px;
  }

  .layout.is-layout-top .layout-header__center {
    flex: 0 1 120px;
    max-width: 120px;
  }
}

@media screen and (width <= 900px) {
  .layout-header__center {
    flex: 0 0 auto;
    max-width: 48px;
  }

  .layout.is-chrome-atmosphere .layout-chrome__media,
  .layout.is-chrome-atmosphere .layout-chrome__fade,
  .layout.is-chrome-atmosphere.is-layout-left .layout-chrome__tagline {
    display: none;
  }
}
</style>
