<script setup lang="ts">
import { watch, ref } from 'vue'

const PasswordStrength = {
  Weakest: '极弱',
  Weak: '弱',
  Medium: '中',
  Strong: '强',
  VeryStrong: '非常强'
}

interface IProps {
  password?: string
}

const props = defineProps<IProps>()
const emits = defineEmits(['update:passwordStrength'])

const passwordStrength = ref(undefined as unknown as number)

function calculatePasswordStrength(password: string): number {
  const length = password.length
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[\W_]/.test(password)

  let strength = 0

  // 基于长度的基本评分
  if (length < 6) {
    strength = 0 // 极弱
  } else if (length >= 6 && length < 10) {
    strength = 1 // 弱
  } else if (length >= 10 && length < 14) {
    strength = 2 // 中
  } else if (length >= 14 && length < 18) {
    strength = 3 // 强
  } else {
    strength = 4 // 非常强
  }

  // 根据不同的条件增加额外的强度分
  if (hasUpperCase) strength++
  if (hasLowerCase) strength++
  if (hasNumber) strength++
  if (hasSpecialChar) strength++

  // 最大强度不超过 4
  return Math.min(strength, 4)
}

watch(
  () => props.password,
  (newVal) => {
    passwordStrength.value = calculatePasswordStrength(newVal as string)
    emits('update:passwordStrength', passwordStrength.value)
  }
)
</script>

<template>
  <div class="flex w-full gap-2">
    <div class="flex-1 flex flex-col items-center">
      <div
        class="w-full h-2 bg-gray-100"
        :class="passwordStrength > 0 ? 'bg-red-600' : 'bg-gray-100'"
      ></div>
      <div>{{ PasswordStrength.Weakest }}</div>
    </div>
    <div class="flex-1 flex flex-col items-center">
      <div
        class="w-full h-2 bg-gray-100"
        :class="passwordStrength > 1 ? 'bg-green-200' : 'bg-gray-100'"
      ></div>
      <div>{{ PasswordStrength.Weak }}</div>
    </div>
    <div class="flex-1 flex flex-col items-center">
      <div
        class="w-full h-2 bg-gray-100"
        :class="passwordStrength >= 2 ? 'bg-green-300' : 'bg-gray-100'"
      ></div>
      <div>{{ PasswordStrength.Medium }}</div>
    </div>
    <div class="flex-1 flex flex-col items-center">
      <div
        class="w-full h-2 bg-gray-100"
        :class="passwordStrength >= 3 ? 'bg-green-400' : 'bg-gray-100'"
      ></div>
      <div>{{ PasswordStrength.Strong }}</div>
    </div>
    <div class="flex-1 flex flex-col items-center">
      <div
        class="w-full h-2 bg-gray-100"
        :class="passwordStrength >= 4 ? 'bg-green-500' : 'bg-gray-100'"
      ></div>
      <div>{{ PasswordStrength.VeryStrong }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
