import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import ChatService from '../service/sessions.service'

class ChatController {
  // 存储聊天记录
  async saveChatHistory(ctx) {
    // 第一次的会话id由后端自动生成,后续的会话id由前端拿到并传给后端,进行续聊
    const { messages, sessionId } = ctx.request.body
    console.log('追加会话:', messages)
    // 存储会话 ID
    let session_id = sessionId || nanoid(10)
    // 用户的 openid
    const openid = ctx.auth.uid
    // 会话时间
    const time = dayjs().format('YYYY-MM-DD')
    // 获取时间戳用以会话排序
    const timestamp = dayjs().valueOf()
    // redis 键名
    const key = `chat:${openid}`
    // 生成唯一消息id,保证该会话中每一条消息的唯一性,并将消息存储到redis中
    const messageId = nanoid(20)
    const messageContent = JSON.stringify({ time, messageId, ...messages })
    // 存储用户会话id
    await ctx.redis.zadd(key, timestamp, session_id)
    // 存储聊天记录
    const sessionKey = `chat:${openid}:${session_id}`
    await ctx.redis.zadd(sessionKey, timestamp, messageContent)
    // 如果前端上传了会话id,则返回历史消息, 否则的话,说明前端开启了新会话, 则返回当前的会话id
    if (sessionId) {
      ctx.send()
    } else {
      console.log('进入该部分逻辑~~~')
      const res = await new ChatService(ctx).getNewChat(openid, session_id)
      console.log('获取新会话:', res)
      ctx.send(res)
    }
  }
  // 获取用户全部聊天记录列表
  async getChatHistory(ctx) {
    const openid = ctx.auth.uid
    const key = `chat:${openid}`
    const sessionIds = await ctx.redis.zrevrange(key, 0, -1)
    let chatHistory = []
    for (const sessionId of sessionIds) {
      const messages = await ctx.redis.zrange(
        `chat:${openid}:${sessionId}`,
        0,
        -1
      )

      const messageContent = messages.map((item) => {
        return JSON.parse(item)
      })
      const firstMessage = messageContent[0]
      const time = firstMessage?.time
      const messageObj = {
        content: firstMessage[0].content,
        role: firstMessage[0].role,
      }
      const sessionData = {
        session_id: sessionId,
        messages: [messageObj],
        time: time,
      }
      chatHistory.push(sessionData)
    }
    ctx.body = chatHistory
  }
  // 点击历史列表项,获取该会话的聊天记录
  async getChatHistoryDetail(ctx) {
    const { sessionId } = ctx.query
    const openid = ctx.auth.uid
    const key = `chat:${openid}:${sessionId}`
    const messages = await ctx.redis.zrange(key, 0, -1)
    console.log(messages)
    const messageContent = messages.map((item) => {
      return JSON.parse(item)
    })
    const chatData = []
    messageContent.forEach((item) => {
      const keys = Object.keys(item)
      keys.forEach((key) => {
        if (key !== 'time' && key !== 'messageId') {
          chatData.push(item[key])
        }
      })
    })
    ctx.send(chatData)
  }
}

export default new ChatController()
