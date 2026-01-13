import Koa from 'koa'
import cors from 'koa2-cors'
import { router } from '../router/index'
import { corsHandler } from './cors'
import bodyParser from 'koa-bodyparser'
import { errorHandler } from './error-handler'

import synchonize from '../config/sync'
synchonize()

const app = new Koa()

app.use(bodyParser())
app.use(cors(corsHandler))
app.on('error', errorHandler)
app.use(router.routes())
app.use(router.allowedMethods())

export default app
