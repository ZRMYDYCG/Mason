import http from '@/api'

export const saveChatHistory = (data: any) => {
  return http.post('/sessions/save-chat-history', data)
}

export const getChatHistory = (data: any) => {
  return http.get('/sessions/get-chat-history', data)
}

export const getChatDetail = (data: any) => {
  return http.get('/sessions/get-chat-detail', data)
}

export const createCompletions = (data: any) => {
  return http.post('/ai/create-completions', data)
}

export const createImage = (data: any) => {
  return http.post('/ai/create-image', data)
}
