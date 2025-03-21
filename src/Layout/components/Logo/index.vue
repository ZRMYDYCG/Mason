<script setup lang="ts">
import { useGlobalStore } from '@/store/modules/global'
import { MenuTypeEnum } from '@/config'
import { computed } from 'vue'
import { useSettingStore } from '@/store/modules/setting.ts'

const globalStore = useGlobalStore()

const isCollapse = computed(() => globalStore.isCollapse)
const settingStore = useSettingStore()

const menuType = computed(() => settingStore.menuType)
</script>

<template>
  <div class="logo">
    <img
      v-show="menuType !== MenuTypeEnum.DUAL_MENU"
      class="logo-img"
      src="@/assets/images/logo.svg"
      alt="logo"
    />
    <span v-show="!isCollapse || menuType === 'top'" class="logo-text">Mason • 石匠</span>
  </div>
</template>

<style scoped lang="scss">
.logo {
  display: flex;
  gap: 10px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  height: 55px;

  .logo-img {
    width: 30px;
  }

  .logo-text {
    white-space: nowrap;
  }
}
</style>
