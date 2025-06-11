class ChatService {
  private ctx: any

  constructor(ctx: any) {
    this.ctx = ctx
  }

  // 获取开启新对话所需要的数据
  async getNewChat(openid, sessionId) {
    const messages = await this.ctx.redis.zrange(
      `chat:${openid}:${sessionId}`,
      0,
      -1
    )
    console.log('messages:', messages)

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

    return sessionData
  }
}

export default ChatService
