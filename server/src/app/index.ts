import Koa from 'koa'
import cors from 'koa2-cors'
import serve from 'koa-static'
import path from 'path'
import { router } from '../router/index'
import { corsHandler } from './cors'
import bodyParser from 'koa-bodyparser'
import { errorHandler } from './error-handler'

import synchonize from '../config/sync'
synchonize()

import mount from 'koa-mount'

const app = new Koa()

app.use(bodyParser())
app.use(cors(corsHandler))
app.use(mount('/public', serve(path.join(__dirname, '../../public'))))
app.on('error', errorHandler)
app.use(router.routes())
app.use(router.allowedMethods())

export default app
