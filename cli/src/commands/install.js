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

export const installCommand = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: '请输入安装的插件名,如安装多个请用空格分隔',
        name: 'lib',
        validate: (val) => {
          if (!val) {
            console.log(red('插件名不能为空,请重新输入'))
          } else {
            return true
          }
        }
      },
      {
        type: 'list',
        name: 'method',
        message: '请选择安装源',
        choices: ['cnpm', 'npm', 'pnpm', 'yarn']
      },
      {
        type: 'list',
        name: 'isPro',
        message: '请选择安装源',
        choices: [
          { name: '生产', value: '-S' },
          { name: '开发', value: '-D' }
        ]
      }
    ])
    .then((answers) => {
      let cmd = `${answers.method} i ${answers.lib} ${answers.isPro}`
      spinner.text = `正在执行 ${cmd}`
      spinner.start()
      let res = execSync(cmd)
      if (res) {
        spinner.succeed('安装成功')
      } else {
        spinner.fail('安装失败')
      }
    })
}
