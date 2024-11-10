<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-11
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
        <el-input v-model="message" placeholder="输入消息..."></el-input>
        <el-button type="primary" @click="sendMessage">发送</el-button>
      </div>
      <el-scrollbar class="h-100%">
        <div v-for="(msg, index) in messages" :key="index" class="flex border-b py-2 px-1 gap-3">
          <div class="bg-gray-100 w-[60px] h-[60px] rounded-full"></div>
          <div class="flex flex-col justify-center">
            <div>一勺</div>
            <div class="text-gray-400 text-sm">{{ msg }}</div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="flex-1">3</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import socket from 'socket.io-client'

const io = socket('ws://127.0.0.1:3000')
const message = ref('') // 用于绑定输入框的消息
const messages = ref<string[]>([]) // 用于存储接收到的消息

onMounted(() => {
  io.on('getMsg', (data: string) => {
    console.log('接收到的消息：', data)
    messages.value.push(data) // 将接收到的消息添加到 messages 数组
  })

  // 发送初始化消息
  setTimeout(() => {
    io.emit('send', '你好，我是客户端发的消息！')
  }, 3000)
})

// 发送消息的函数
const sendMessage = () => {
  if (message.value.trim()) {
    io.emit('send', message.value) // 发送用户输入的消息
    message.value = '' // 清空输入框
  }
}
</script>

<style lang="scss" scoped>
/* 这里可以添加你的样式 */
</style>
