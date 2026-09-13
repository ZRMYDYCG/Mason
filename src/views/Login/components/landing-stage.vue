<script setup lang="ts">
import { computed } from 'vue'
import heroBg from '@/assets/images/landing/hero-bg.png'
import heroBgNight from '@/assets/images/landing/hero-bg-night.png'
import { useSettingStore } from '@/store/modules/setting.ts'

const settingStore = useSettingStore()
const isDark = computed(() => settingStore.isDark)
const heroBgSrc = computed(() => (isDark.value ? heroBgNight : heroBg))
</script>

<template>
  <div class="hero-stage" :style="{ backgroundImage: `url(${heroBgSrc})` }">
    <slot />
  </div>
</template>

<style scoped>
.hero-stage {
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
}
</style>
