import Router from 'koa-router'
import chatController from '../controller/chat.controller'

const chatRouter = new Router({
  prefix: '/chat',
})

/**
 * 测试获取所有聊天记录
 * */
chatRouter.get('/all', chatController.getAllChatRecords)

/**
 * 获取指定两个用户之间的聊天记录
 */
chatRouter.post('/between', chatController.getChatRecordsBetween)

/**
 * 发送聊天信息
 */
chatRouter.put('/send', chatController.sendChatMsg)

export default chatRouter
