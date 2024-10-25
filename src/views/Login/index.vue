<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: 
-->
<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/index'

const username = ref('')
const password = ref('')
const userStore = useUserStore()

const handleLogin = () => {
  userStore.loginAction({ username: username.value, password: password.value })
}
</script>

<template>
  <el-input v-model="username"></el-input>
  <el-input v-model="password"></el-input>
  <el-button @click="handleLogin">Login</el-button>
</template>

<style scoped></style>
