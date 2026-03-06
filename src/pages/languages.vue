<template>
  <div class="flex gap-2">
    <button
      v-for="lang in languages"
      :key="lang.value"
      :class="{ active: currentLocale === lang.value }"
      @click="onChangeLanguage(lang.value)"
    >
      {{ lang.label }}
    </button>
  </div>
  <div>{{ $t('common.welcome', { name: '一勺' }) }}</div>
  <div>{{ $t('home.title') }}</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { loadLanguage } from '@/i18n'

const { t, locale } = useI18n()
console.log(t('common.welcome', { name: '一勺' }))

const currentLocale = locale

// 支持的语言
const languages = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
]

const onChangeLanguage = async (lang: string) => {
  await loadLanguage(lang)
  locale.value = lang
}
</script>
