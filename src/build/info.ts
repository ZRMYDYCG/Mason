import type { Plugin } from 'vite'
import gradient from 'gradient-string'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import boxen, { type Options as BoxenOptions } from 'boxen'
dayjs.extend(duration)

const welcomeMessage = gradient(['cyan', 'magenta']).multiline(
  `您好! 欢迎使用 Kafka 监控系统\n\n这是一个专为Kafka集群监控而设计的现代化工具。\n我们致力于为您提供最全面的监控数据和最友好的操作界面。\n希望您在这里能够轻松地管理和优化您的Kafka集群，享受愉快的监控过程。\n\n祝您监控顺利!\n`
)

const boxenOptions: BoxenOptions = {
  padding: 0.5,
  borderColor: 'cyan',
  borderStyle: 'round'
}

export function viteBuildInfo(): Plugin {
  let config: { command: string }
  return {
    name: 'vite:buildInfo',
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    buildStart() {
      console.log(boxen(welcomeMessage, boxenOptions))
      if (config.command === 'build') {
      }
    },
    closeBundle() {
      if (config.command === 'build') {
      }
    }
  }
}
