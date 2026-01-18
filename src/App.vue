<template>
  <el-config-provider :locale="elementPlusLocale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { useTheme } from '@/hooks/useTheme'
import { useSettingStore } from '@/store/modules/setting'
import { computed, watch } from 'vue'
import { setI18nLocale } from '@/language'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { initTheme } = useTheme()
initTheme()

const settingStore = useSettingStore()
const route = useRoute()
const { t } = useI18n({ useScope: 'global' })

const elementPlusLocale = computed(() => {
  return settingStore.currentLanguage === 'en' ? en : zhCn
})

watch(
  () => settingStore.currentLanguage,
  (lang) => {
    setI18nLocale(lang)
  },
  { immediate: true }
)

watch(
  [() => route.fullPath, () => settingStore.currentLanguage],
  () => {
    const titleKey = route.meta?.titleKey as string | undefined
    const rawTitle = route.meta?.title as string | undefined
    const routeTitle = titleKey ? t(titleKey) : rawTitle
    document.title = routeTitle ? `Mason - ${routeTitle}` : 'Mason'
  },
  { immediate: true }
)
</script>

<style></style>
