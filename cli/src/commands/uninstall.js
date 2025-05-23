import { execSync } from 'child_process'
import inquirer from 'inquirer'
import ora from 'ora'
import pkg from 'picocolors'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const spinner = ora()
const { red } = pkg

export const uninstallCommand = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: '请输入要卸载的插件名',
        validate: (val) => {
          if (!val) {
            console.log(red('插件名不能为空,请重新输入'))
          } else {
            return true
          }
        }
      }
    ])
    .then((answer) => {
      let cmd = `pnpm uninstall ${answer.name}`
      spinner.text = `正在执行 ${cmd}`
      spinner.start()
      let res = execSync(cmd)
      if (res) {
        spinner.succeed('卸载成功')
      } else {
        spinner.fail('卸载失败')
      }
    })
}
