import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

// 房间管理
const rooms = new Map()

io.on('connection', (socket) => {
  const roomId = socket.handshake.query.room || 'default-room'

  // 加入房间
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set())
  }
  rooms.get(roomId).add(socket.id)

  // 通知房间内用户
  broadcastUserList(roomId)

  // 信令转发
  socket.on('offer', (offer) => {
    socket.to(roomId).emit('offer', offer)
  })

  socket.on('answer', (answer) => {
    socket.to(roomId).emit('answer', answer)
  })

  socket.on('candidate', (candidate) => {
    socket.to(roomId).emit('candidate', candidate)
  })

  socket.on('hangup', () => {
    socket.to(roomId).emit('hangup')
  })

  // 断开连接处理
  socket.on('disconnect', () => {
    if (rooms.has(roomId)) {
      rooms.get(roomId).delete(socket.id)
      if (rooms.get(roomId).size === 0) {
        rooms.delete(roomId)
      } else {
        broadcastUserList(roomId)
      }
    }
  })
})

// 广播用户列表
function broadcastUserList(roomId: any) {
  const users = Array.from(rooms.get(roomId) || [])
  io.to(roomId).emit('userList', users)
}

server.listen(3333, () => {
  console.log('信令服务器运行在: http://localhost:3333')
})
