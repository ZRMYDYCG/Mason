<script setup lang="ts">
import { onMounted } from 'vue'
import type { IMenubarList } from '@/config/interface'
const props = defineProps<{ menuList: IMenubarList[] }>()

onMounted(() => {
  console.log(props.menuList)
})
</script>

<template>
</template>

<style scoped></style>
