import type { Plugin } from 'vite'
import gradient from 'gradient-string'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import boxen, { type Options as BoxenOptions } from 'boxen'
dayjs.extend(duration)

const welcomeMessage = gradient(['cyan', 'magenta']).multiline(
  `您好! 欢迎使用 Mason Admin\n\n这是一款专为提升开发效率而设计的现代化管理后台系统。\n我们致力于为您提供最流畅的开发体验和最强大的工具支持。\n希望您在这里找到所需的资源，享受愉快的开发过程。\n\n祝您工作顺利!\n`
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
