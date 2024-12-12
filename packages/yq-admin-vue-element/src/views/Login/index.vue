<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <div class="flex items-center justify-center mb-6">
        <img class="w-10 h-10" src="@/assets/images/logo.svg" alt="logo" />
        <h2 class="ml-3 text-2xl font-bold text-gray-800">后台管理集成方案</h2>
      </div>
      <LoginForm ref="loginRef" />
      <div class="flex justify-between mt-6">
        <el-button class="w-1/2 mr-2" @click="handleResetClick">重置</el-button>
        <el-button type="primary" class="w-1/2" @click="handleSubmitClick">立即登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from './components/LoginForm.vue'

const loginRef = ref<InstanceType<typeof LoginForm>>()

const handleSubmitClick = () => {
  loginRef.value?.loginAction()
}

const handleResetClick = () => {
  loginRef.value?.resetAction()
}
</script>

<style scoped></style>
