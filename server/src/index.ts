import { createServer } from 'http'
import dotenv from 'dotenv'
dotenv.config()

import app from './app/index'
import { APP_PORT } from './config/index'
import { connectMysql } from './config/mysql'

async function runServer() {
  const port = APP_PORT
  try {
    await Promise.all([connectMysql()])

    await new Promise((resolve) => {
      const server = createServer(app.callback())

      server.listen(port, () => {
        console.log(`应用运行在: http://127.0.0.1:${port}`)
      })
    })
  } catch (error) {
    console.log(`项目启动失败:${error}`)
  }
}

runServer()
