import { program } from 'commander'
import { gitHelperCommand } from './commands/gitHelper.js'

// 初始化所有命令
export const initializeCommands = () => {
  // 注册 git 命令组
  gitHelperCommand()

  // 最后解析参数
  program.parse(process.argv)
}

initializeCommands()
