import { program } from 'commander'
import { gitHelperCommand } from './commands/gitHelper.js'
import { createProjectCommandConfig } from './commands/createProject.js'
import { genComponentCommandConfig } from './commands/createComponent.js'
import { genViewCommandConfig } from './commands/createView.js'

// 初始化所有命令
const initializeCommands = () => {
  // 注册 git 命令组
  gitHelperCommand()

  // 注册 create 命令组
  createProjectCommandConfig()

  // 注册 gen 命令组
  genComponentCommandConfig()
  genViewCommandConfig()

  // 最后解析参数
  program.parse(process.argv)
}

initializeCommands()
