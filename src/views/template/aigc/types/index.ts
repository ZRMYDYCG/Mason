export type MessageRole = 'user' | 'assistant' | 'system'

export interface Message {
  id: string
  content: string
  role: MessageRole
  timestamp: Date
  status?: 'sending' | 'sent' | 'failed'
  type?: 'text' | 'image' | 'code' | 'loading'
  metadata?: Record<string, any>
}

export type ChatTheme = 'light' | 'dark' | 'custom'

export interface ChatConfig {
  theme?: ChatTheme
  showAvatars?: boolean
  avatarMapping?: Record<MessageRole, string>
  markdownOptions?: any
  autoScroll?: boolean
}
