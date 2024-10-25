<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: 
-->
<script setup lang="ts">
import { ref } from 'vue'
import { login, getRoute } from '@/api/modules/user'

const username = ref('')
const password = ref('')

const handleLogin = () => {
  login({ username: username.value, password: password.value }).then(res => {
    localStorage.setItem('token', res.data.data)

      getRoute().then(res => {
        console.log(res)
      })
  })
}
</script>

<template>
  <el-input v-model="username"></el-input>
  <el-input v-model="password"></el-input>
  <el-button @click="handleLogin">Login</el-button>
</template>

<style scoped></style>
