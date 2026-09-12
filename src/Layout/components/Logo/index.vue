<script setup lang="ts">
import { computed } from 'vue'
import { MenuTypeEnum, HOME_URL } from '@/config'
import { useGlobalStore } from '@/store/modules/global'
import { useSettingStore } from '@/store/modules/setting.ts'
import { useRouter } from 'vue-router'

const globalStore = useGlobalStore()
const settingStore = useSettingStore()
const router = useRouter()

const isCollapse = computed(() => globalStore.isCollapse)
const menuType = computed(() => settingStore.menuType)
const menuTheme = computed(() => settingStore.getMenuTheme)

const showBrandText = computed(() => {
  if (menuType.value === MenuTypeEnum.DUAL_MENU) return false
  if (menuType.value === MenuTypeEnum.TOP || menuType.value === MenuTypeEnum.TOP_LEFT) return true
  return !isCollapse.value
})

const goHome = () => {
  router.push(HOME_URL)
}
</script>

<template>
  <button type="button" class="logo" :class="{ compact: !showBrandText }" @click="goHome">
    <img class="logo-img" src="@/assets/images/logo.png" alt="Mason" />
    <div v-if="showBrandText" class="logo-copy">
      <span class="logo-name" :style="{ color: menuTheme.textColor }">Mason</span>
      <span class="logo-tagline" :style="{ color: menuTheme.systemNameColor }">
        Build A Better Tomorrow
      </span>
    </div>
  </button>
</template>

<style scoped>
.logo {
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  gap: 10px;
  align-items: center;
  width: auto;
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
  padding: 0;
}

.logo-img {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 8px;
}

.logo-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-start;
  min-width: 0;
  text-align: left;
}

.logo-name {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.logo-tagline {
  font-size: 9px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}
</style>
