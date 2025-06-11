import Koa from 'koa'
// 引入 cors 中间件
import cors from 'koa2-cors'
import { router } from '../router'
import { corsHandler } from './cors'
// 引入 bodyParser 中间件
import bodyParser from 'koa-bodyparser'
// 引入错误处理中间件
import { errorHandler } from './error-handler'
import KoaRedis from 'ioredis'

// import synchonize from '../models/sync'
// synchonize()

const app = new Koa()

// ctx.body
app.use(bodyParser())

// cors
app.use(cors(corsHandler))

// errorHandler
app.on('error', errorHandler)

// swagger 配置

// redis 配置
const redisClient = new KoaRedis({
  port: 6379,
  host: 'localhost',
})

app.use(async (ctx, next) => {
  ctx.redis = redisClient
  await next()
})

// 导入路由
app.use(router.routes())
app.use(router.allowedMethods())

export default app
