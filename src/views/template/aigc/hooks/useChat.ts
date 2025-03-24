import { ref } from 'vue'
import { Message } from '../types'

export default function useChat(initialMessages: Message[] = []) {
  const messages = ref<Message[]>(initialMessages)
  const isTyping = ref(false)

  const sendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
      status: 'sent'
    }

    messages.value.push(userMessage)

    isTyping.value = true
  }

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    messages.value.push({
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    })
  }

  const simulateResponse = (content: string) => {
    isTyping.value = false

    const assistantMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'assistant',
      timestamp: new Date(),
      status: 'sent'
    }

    messages.value.push(assistantMessage)
  }

  return {
    messages,
    sendMessage,
    addMessage,
    simulateResponse,
    isTyping
  }
}
