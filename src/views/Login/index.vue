<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo-title-container">
        <img class="logo" src="@/assets/images/logo.svg" alt="logo" />
        <h2 class="title">Mason • 石匠</h2>
      </div>
      <LoginForm v-if="isLogin" ref="loginRef" />
      <RegisterForm v-else ref="registerRef" @register-success="handleRegisterSuccess" />
      <div class="button-container">
        <el-button class="reset-button" @click="handleResetClick">重置</el-button>
        <el-button type="primary" class="submit-button" @click="handleSubmitClick">{{
          isLogin ? '立即登录' : '立即注册'
        }}</el-button>
      </div>
      <div class="switch-container">
        <el-link type="primary" :underline="false" @click="toggleLogin">{{
          isLogin ? '没有账号？去注册' : '已有账号？去登录'
        }}</el-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from './components/login-form.vue'
import RegisterForm from './components/register-form.vue'

const isLogin = ref(true)
const loginRef = ref<InstanceType<typeof LoginForm>>()
const registerRef = ref<InstanceType<typeof RegisterForm>>()

const handleSubmitClick = () => {
  if (isLogin.value) {
    loginRef.value?.loginAction()
  } else {
    registerRef.value?.registerAction()
  }
}

const handleResetClick = () => {
  if (isLogin.value) {
    loginRef.value?.resetAction()
  } else {
    registerRef.value?.resetAction()
  }
}

const toggleLogin = () => {
  isLogin.value = !isLogin.value
}

const handleRegisterSuccess = () => {
  isLogin.value = true
}
</script>

<style scoped lang="scss">
@import './theme/index';

.switch-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
