import path from 'path'
import fs from 'fs-extra'
import pkg from 'picocolors'
import downloadGitRepo from 'download-git-repo'
import ora from 'ora'
import util from 'util'
import { program } from 'commander'

const { blue, red, green } = pkg
const cwd = process.cwd()
const spinner = ora()
const downloadProject = util.promisify(download)

const createProjectCommand = async (projectName, options) => {
  const projectPath = path.join(cwd, projectName)
  if (fs.existsSync(projectPath)) {
    if (options.overwrite) {
      fs.removeSync(projectPath)
      fs.mkdirSync(projectPath)
      await downloadProject(projectName)
      return
    } else {
      console.log(blue('已取消操作'))
      process.exit(1)
    }
  } else {
    fs.mkdirSync(projectPath)
    await downloadProject(projectName)
  }
}

async function download(projectName) {
  spinner.text = '拉取代码中...'
  spinner.start()
  let requestUrl = `github:ZRMYDYCG/Mason#main`
  downloadGitRepo(requestUrl, projectName, (err) => {
    if (err) {
      console.log()
      console.log(red('拉取失败', err))
      fs.removeSync(path.join(cwd, projectName))
      process.exit(1)
    } else {
      spinner.succeed('创建项目成功')
      console.log(green(`cd ${projectName} && npm i`))
      console.log()
      // perf 获取到的包管理器, 动态渲染, 默认值为 npm
      console.log(green('pnpm install 安装依赖'))
      console.log(green('pnpm run dev 启动项目'))
    }
  })
}

export const createProjectCommandConfig = () => {
  program
    .command('create <projectName>')
    .description('创建一个新项目')
    .option('-o, --overwrite', '覆盖已存在的项目目录')
    .action(createProjectCommand)
}
