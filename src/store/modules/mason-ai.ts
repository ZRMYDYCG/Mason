import { defineStore } from 'pinia'
import { createSSEConnection } from '@/utils/sse'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as ChatMessage[],
    accumulatedResponse: '',
    webSearchList: [] as string[],
    isLoading: false,
    error: null as string | null,
    abortController: null as AbortController | null
  }),

  actions: {
    async sendMessage(content: string) {
      if (!content.trim() || this.isLoading) return

      try {
        // 添加用户消息
        this.addUserMessage(content)

        // 添加占位助手消息
        this.messages.push({
          role: 'assistant',
          content: '' // 初始化为空内容
        })

        this.isLoading = true
        this.error = null
        this.accumulatedResponse = ''
        this.abortController = new AbortController()

        await createSSEConnection({
          url: 'http://127.0.0.1:3000/ai/create-completions',
          method: 'POST',
          body: {
            messages: this.messages.slice(0, -1)
          },
          onMessage: this.handleSSEMessage,
          onError: this.handleSSEError
        })
      } catch (err) {
        this.handleRequestError(err)
        // 移除占位消息（如果发生错误）
        if (this.messages[this.messages.length - 1]?.content === '') {
          this.messages.pop()
        }
      } finally {
        this.isLoading = false
        this.abortController = null
      }
    },

    addUserMessage(content: string) {
      if (this.messages.length > 0) {
        const lastMsg = this.messages[this.messages.length - 1]
        if (lastMsg.role === 'assistant' && !lastMsg.content) {
          this.messages.pop()
        }
      }

      this.messages.push({
        role: 'user',
        content: content.trim()
      })
    },

    handleSSEMessage(chunk: string) {
      if (chunk === '[DONE]') {
        this.finalizeAssistantMessage()
        return
      }

      const data = JSON.parse(chunk)
      if (data.choices?.[0]?.finish_reason === 'stop') {
        this.handleStopReason(data)
        this.finalizeAssistantMessage()
      } else {
        const contentChunk = data.choices[0].delta.content || ''
        this.accumulatedResponse += contentChunk

        // 实时更新最后一条助手消息
        const lastMessage = this.messages[this.messages.length - 1]
        if (lastMessage?.role === 'assistant') {
          lastMessage.content = this.accumulatedResponse
        }
      }
    },

    handleSSEError(err: Error) {
      this.error = `请求失败: ${err.message}`
      throw err
    },

    handleRequestError(err: unknown) {
      this.error = `请求异常: ${(err as Error).message}`
    },

    handleStopReason(data: any) {
      if (data.web_search) {
        this.webSearchList = data.web_search
      }
    },

    finalizeAssistantMessage() {
      // 处理可能的最终处理逻辑
      if (this.accumulatedResponse) {
        // 确保内容完整性
        const lastMessage = this.messages[this.messages.length - 1]
        if (lastMessage?.role === 'assistant') {
          lastMessage.content = this.accumulatedResponse
        }
        this.accumulatedResponse = ''
      }
    },

    abortRequest() {
      if (this.abortController) {
        this.abortController.abort()
        this.abortController = null
        this.isLoading = false
      }
    },

    reset() {
      this.messages = []
      this.accumulatedResponse = ''
      this.webSearchList = []
      this.isLoading = false
      this.error = null
      this.abortController = null
    }
  }
})
