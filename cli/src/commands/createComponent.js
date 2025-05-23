import path from 'path'
import fs from 'fs-extra'
import ejs from 'ejs'
import pkg from 'picocolors'
import { toUpperCase } from '../utils/index.js'
import { program } from 'commander'
import { fileURLToPath } from 'url'

const { red, blue } = pkg
const cwd = process.cwd()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const componentDirPath = path.resolve(cwd, 'src/components')
const templatePath = path.resolve(__dirname, '../templates/component.ejs')

const genComponent = async (dirname, filename, options) => {
  if (!filename) {
    console.log(red('文件名称不能为空!'))
    return
  }
  const componentPath = dirname
    ? `${componentDirPath}/${dirname}/${toUpperCase(filename)}.vue`
    : `${componentDirPath}/${toUpperCase(filename)}.vue`

  if (fs.existsSync(componentPath)) {
    if (options.overwrite) {
      fs.unlinkSync(componentPath)
      await createComponent(dirname, filename)
    } else {
      console.log(blue('已取消操作'))
      process.exit(1)
    }
  } else {
    await createComponent(dirname, filename)
  }
}

async function createComponent(dirname, filename) {
  const dirPath = `${componentDirPath}/${dirname}`
  const filePath = dirname
    ? `${componentDirPath}/${dirname}/${toUpperCase(filename)}.vue`
    : `${componentDirPath}/${toUpperCase(filename)}.vue`
  const content = await ejs.renderFile(templatePath, { data: { name: filename } })
  if (dirname) {
    if (fs.existsSync(dirPath)) {
      fs.writeFileSync(filePath, content)
    } else {
      fs.mkdirSync(dirPath)
      fs.writeFileSync(filePath, content)
    }
  } else {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      fs.writeFileSync(filePath, content)
    } else {
      fs.writeFileSync(filePath, content)
    }
  }
}

export const genComponentCommandConfig = () => {
  program
    .command('gen <filename>')
    .description('生成一个新的组件')
    .option('-d, --dirname <dirname>', '指定文件夹名称')
    .option('-o, --overwrite', '覆盖已存在的组件文件')
    .action((filename, options) => genComponent(options.dirname, filename, options))
}
