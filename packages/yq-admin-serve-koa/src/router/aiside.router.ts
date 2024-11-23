import Router from 'koa-router'
import AisideController from '../controller/aiside.controller'

const asideRouter = new Router()

/**
 * 文生文
 */
asideRouter.post('/text', AisideController.textConversation)

/**
 * 文生图
 */
asideRouter.post('/image')

/**
 * 语音识别
 */
asideRouter.post('/voice')

export default asideRouter
