<script setup lang="ts">
import { actions, List } from '@/config'
import NotificationContainer from './notification/index.vue'
import NotificationList from './notification/notification-list.vue'
</script>

<template>
  <NotificationContainer is-dot>
    <NotificationList :list="List as any" :actions="actions" />
  </NotificationContainer>
</template>

<style scoped lang="scss"></style>
