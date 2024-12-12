<template>
  <div class="flex w-full h-full bg-orange-50">
    <div class="w-[90px] flex justify-center bg-amber-900 py-4">
      <div class="w-[60px] h-[60px] bg-blue-500 rounded-full"></div>
    </div>
    <div class="w-[250px] bg-yellow-200 h-full flex flex-col">
      <div ref="headerRef" class="flex pt-5 px-2">
        <el-input v-model="message" placeholder="输入消息..."></el-input>
        <el-button type="primary" @click="sendMessage">发送</el-button>
        <el-button type="primary" @click="sendNotice">发布公告</el-button>
      </div>
      <el-scrollbar class="h-100%">
        <div v-for="(msg, index) in 1" :key="index" class="flex border-b py-2 px-1 gap-3">
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
import { ref } from 'vue'
import socket from 'socket.io-client'

const io = socket('ws://127.0.0.1:3000')
const message = ref('')

const sendMessage = () => {
  if (message.value.trim()) {
    // 私聊
    io.emit('signal', {
      sendId: 1,
      type: 0,
      content: message.value,
      recipientId: 2,
      avatar: '/user1'
    })
    message.value = ''
  }
}

const sendNotice = () => {
  io.emit('notice', '发布了一则公告')
}

io.on('getMessage', (data) => {
  console.log(data)
})
</script>

<style lang="scss" scoped></style>
