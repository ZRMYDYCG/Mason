import Router from 'koa-router'
import logController from './log.controller'
import { verifyAuth } from '../../middleware/auth.middleware'

const logRouter = new Router({ prefix: '/log' })

logRouter.post('/list', verifyAuth, logController.getLogList)
logRouter.post('/delete', verifyAuth, logController.deleteLog)

export default logRouter
