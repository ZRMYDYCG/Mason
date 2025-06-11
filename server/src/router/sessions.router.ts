import Router from 'koa-router'
import SessionController from '../controller/sessions.controller'

const sessionRouter = new Router({ prefix: '/sessions' })

sessionRouter.post('/save-chat-history', SessionController.saveChatHistory)
sessionRouter.get('/get-chat-history', SessionController.getChatHistory)
sessionRouter.get('/get-chat-detail', SessionController.getChatHistoryDetail)
