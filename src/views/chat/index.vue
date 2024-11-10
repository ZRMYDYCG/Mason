<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-11
 * @Description:
-->
<template>
  <div class="flex w-full h-full bg-orange-50">
    <div class="w-[90px] flex justify-center bg-amber-900 py-4">
      <div class="w-[60px] h-[60px] bg-blue-500 rounded-full"></div>
    </div>
    <div class="w-[250px] bg-yellow-200 h-full flex flex-col">
      <div ref="headerRef" class="flex pt-5 px-2">
        <el-input></el-input>
        <el-button></el-button>
      </div>
      <el-scrollbar class="h-100%">
        <div class="flex border-b py-2 px-1 gap-3">
          <div class="bg-gray-100 w-[60px] h-[60px] rounded-full"></div>
          <div class="flex flex-col justify-center">
            <div>一勺</div>
            <div class="text-gray-400 text-sm">吃饭了吗?</div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="flex-1">3</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// import {} from '@/api/modules/system'
import socket from 'socket.io-client'
const io = socket('ws://127.0.0.1:3000')

try {
  io.on('connection', (client) => {
    console.log('客户端连接成功', client)
  })
} catch (error) {}

onMounted(() => {})
</script>

<style lang="scss" scoped>
/* 这里可以添加你的样式 */
</style>
