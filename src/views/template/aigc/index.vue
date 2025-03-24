<script setup lang="ts">
import { ref } from 'vue'
import ChatWindow from './chat-container.vue'
import { Message } from './types'

const initialMessages: Message[] = [
  {
    id: '1',
    content:
      '# 斐波那契数列计算程序\n' +
      '\n' +
      '这是一个简单的 Python 程序，用于计算斐波那契数列的前 N 项。\n' +
      '\n' +
      '## 代码示例\n' +
      '\n' +
      '```python\n' +
      'def fibonacci(n):\n' +
      '    """\n' +
      '    计算斐波那契数列的前 n 项\n' +
      '    :param n: 项数\n' +
      '    :return: 包含斐波那契数列的列表\n' +
      '    """\n' +
      '    if n <= 0:\n' +
      '        return []\n' +
      '    elif n == 1:\n' +
      '        return [0]\n' +
      '    elif n == 2:\n' +
      '        return [0, 1]\n' +
      '    else:\n' +
      '        fib_list = [0, 1]\n' +
      '        while len(fib_list) < n:\n' +
      '            next_value = fib_list[-1] + fib_list[-2]\n' +
      '            fib_list.append(next_value)\n' +
      '        return fib_list\n' +
      '\n' +
      '# 示例：计算斐波那契数列的前 10 项\n' +
      'n = 10\n' +
      'result = fibonacci(n)\n' +
      'print(f"斐波那契数列的前 {n} 项为：{result}")',
    role: 'assistant',
    timestamp: new Date(),
    status: 'sent'
  }
]

const config = {
  theme: 'light',
  showAvatars: true,
  avatarMapping: {
    user: 'https://i.pravatar.cc/150?img=3',
    assistant: 'https://i.pravatar.cc/150?img=5',
    system: 'https://i.pravatar.cc/150?img=7'
  }
}

const chatWindowRef = ref()

const handleSend = (content: string) => {
  setTimeout(() => {
    chatWindowRef.value.simulateResponse(
      `I received your message: "${content}". This is a simulated response.`
    )
  }, 1500)
}
</script>

<template>
  <div class="chat-demo">
    <ChatWindow
      ref="chatWindowRef"
      :initial-messages="initialMessages"
      :config="config"
      @send="handleSend"
    />
  </div>
</template>

<style scoped>
.chat-demo {
  width: 100%;
  height: 600px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}
</style>
