import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import { APP_PORT } from './config'
import { connectMysql } from './config/mysql'

import chatService from './service/chat.service'

async function runServer() {
  const port = APP_PORT // 端口
  try {
    await Promise.all([
      connectMysql(), // 连接mysql
      // connectRedis(), // 连接redis
    ])

    await new Promise((resolve) => {
      const server = createServer(app.callback())

      const io = new SocketIOServer(server, {
        cors: {
          origin: '*', // 可根据需要设置具体的源
        },
      })

      // 启动服务器
      server.listen(port, () => {
        console.log(`应用运行在: http://127.0.0.1:${port}`)
      })

      // Socket.IO
      /**
       * 1. 监听用户上线, 改变用户在线状态
       * 2. 监听用户点击某条消息, 改变消息的已读状态, 保存到数据库
       * 3. 监听用户给其它用户发送的消息, 保存到数据库
       * 4. 监听用户离线, 改变用户在线状态
       * 5. 监听系统的在线人数
       * 6. 监听每一个用户接收的消息, 推送到客户端
       */
      io.on('connection', (socket) => {
        socket.on('signal', (data: any) => {
          // TODO: 监听用户给其它用户发送的消息, 保存到数据库
          console.log('客户端发送的内容：', data)
          chatService.send(data)
        })
        socket.on('notice', (data: any) => {
          // TODO: 监听每一个用户接收的消息, 推送到客户端
          console.log('推送的消息:', data)
          socket.emit('getMessage', data)
        })
      })
    })
  } catch (error) {
    console.log(`项目启动失败:${error}`)
  }
}

runServer()
