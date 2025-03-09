<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo-title-container">
        <img class="logo" src="@/assets/images/logo.svg" alt="logo" />
        <h2 class="title">Mason • 石匠</h2>
      </div>
      <LoginForm ref="loginRef" />
      <div class="button-container">
        <el-button class="reset-button" @click="handleResetClick">重置</el-button>
        <el-button type="primary" class="submit-button" @click="handleSubmitClick"
          >立即登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from './components/login-form.vue'

const loginRef = ref<InstanceType<typeof LoginForm>>()

const handleSubmitClick = () => {
  loginRef.value?.loginAction()
}

const handleResetClick = () => {
  loginRef.value?.resetAction()
}
</script>

<style scoped lang="scss">
@import './theme/index';
</style>
