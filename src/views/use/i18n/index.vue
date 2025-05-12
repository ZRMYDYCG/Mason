<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div>国际化测试</div>
  <div>{{ t('test.weatherDesc') }}</div>
</template>

<style scoped lang="scss"></style>
