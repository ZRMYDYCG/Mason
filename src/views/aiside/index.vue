<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-11
 * @Description:
-->
<template>
  <div></div>
</template>
<script setup lang="ts">
import socket from 'socket.io-client'
const io = socket('ws://127.0.0.1:3000')

try {
  io.on('connection', (client) => {
    console.log('客户端连接成功', client)
  })
} catch (error) {}
</script>
<style lang="scss" scoped></style>
