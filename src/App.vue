<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: App.vue
-->
<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { login, getUserInfo } from '@/api/modules/user'

onBeforeMount(async () => {
  // 登录
  const user = await login({
    username: 'admin',
    password: '123456789',
  })
  console.log(user)

  // 获取用户信息
  const users = await getUserInfo()
  console.log(users)
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
