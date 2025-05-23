import { program } from 'commander'
import { gitHelperCommand } from './commands/gitHelper.js'
import { createProjectCommandConfig } from './commands/createProject.js'
import { genComponentCommandConfig } from './commands/createComponent.js'
import { genViewCommandConfig } from './commands/createView.js'
import { statisticsCommand } from './commands/statistics.js'
import { installCommand } from './commands/install.js'
import { uninstallCommand } from './commands/uninstall.js'
import { createFileCommand } from './commands/createFile.js'

// 初始化所有命令
const initializeCommands = () => {
  // 注册 git 命令组
  gitHelperCommand()

  // 注册 create 命令组
  createProjectCommandConfig()

  // 注册 gen 命令组
  genComponentCommandConfig()
  genViewCommandConfig()

  // 注册 statistics 命令组
  program
    .command('statistics')
    .description('统计项目中的字符数和代码行数')
    .action(statisticsCommand)

  // 注册 install 命令组
  program.command('install').description('安装项目依赖').action(installCommand)

  // 注册 uninstall 命令组
  program.command('uninstall').description('卸载项目依赖').action(uninstallCommand)

  // 注册 create-file 命令组
  program.command('create-file').description('创建一个新文件').action(createFileCommand)

  // 最后解析参数
  program.parse(process.argv)
}

initializeCommands()
