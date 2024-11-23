import type { Context } from 'koa'
import ChatService from '../service/chat.service'

class ChatController {
  async getAllChatRecords(ctx: Context) {
    const records = await ChatService.allChatRecords()
    ctx.body = {
      code: 200,
      data: records,
      msg: '获取成功',
    }
  }
  async getChatRecordsBetween(ctx: Context) {
    const { recipientId, sendId } = ctx.request.body as any
    const records = await ChatService.betweenChatRecords(recipientId, sendId)

    ctx.body = {
      code: 200,
      data: records,
      msg: '获取成功',
    }
  }

  async sendChatMsg(ctx: Context) {
    const { recipientId, sendId, content, type, avatar } = ctx.request
      .body as any

    await ChatService.send({
      recipientId,
      sendId,
      content,
      type: 0,
      avatar,
    })
    ctx.body = {
      code: 200,
      msg: '发送成功',
    }
  }
}

export default new ChatController()
