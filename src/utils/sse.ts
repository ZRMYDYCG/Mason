import { fetchEventSource } from '@microsoft/fetch-event-source'

interface SSEOptions {
  url: string
  method?: 'POST' | 'GET'
  headers?: Record<string, string>
  body?: any
  onMessage: (data: string) => void
  onError?: (error: Error) => void
}

export async function createSSEConnection(options: SSEOptions) {
  const { url, onMessage, onError } = options

  await fetchEventSource(url, {
    method: options.method || 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    body: JSON.stringify(options.body),
    async onopen(response) {
      if (response.status !== 200) {
        throw new Error(`SSE connection failed: ${response.status}`)
      }
    },
    onmessage(event) {
      if (event.data) {
        onMessage(event.data)
      }
    },
    onerror(err) {
      onError?.(err)
      throw err
    }
  })
}
