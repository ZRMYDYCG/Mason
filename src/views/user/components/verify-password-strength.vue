<script setup lang="ts">
import { watch } from 'vue'

enum PasswordStrength {
  Weakest = 0,
  Weak = 1,
  Medium = 2,
  Strong = 3,
  VeryStrong = 4
}

interface IProps {
  password?: string
}

const props = defineProps<IProps>()

watch(
  () => props.password,
  (newVal, oldVal) => {
    console.log(newVal, oldVal)
  }
)
</script>

<template>
  <div class="flex w-full gap-2">
    <div class="flex-1 h-2 bg-red-600"></div>
    <div class="flex-1 h-2 bg-green-200"></div>
    <div class="flex-1 h-2 bg-green-300"></div>
    <div class="flex-1 h-2 bg-green-400"></div>
    <div class="flex-1 h-2 bg-green-500"></div>
  </div>
</template>

<style scoped lang="scss"></style>
