import { createServer } from 'http'
import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import { APP_PORT } from './config'
import { connectMysql } from './config/mysql'

async function runServer() {
  const port = APP_PORT // 端口
  try {
    await Promise.all([
      connectMysql(), // 连接mysql
      // connectRedis(), // 连接redis
    ])

    await new Promise((resolve) => {
      const server = createServer(app.callback())

      // 启动服务器
      server.listen(port, () => {
        console.log(`应用运行在: http://127.0.0.1:${port}`)
      })
    })
  } catch (error) {
    console.log(`项目启动失败:${error}`)
  }
}

runServer()
