import path from 'path'
import fs from 'fs-extra'
import ejs from 'ejs'
import pkg from 'picocolors'
import parser from '@babel/parser'
import generate from '@babel/generator'
import traverse from '@babel/traverse'
import types from '@babel/types'
import { toLowerCase, toUpperCase } from '../utils/index.js'
import { program } from 'commander'
import { fileURLToPath } from 'url'

const { red, blue } = pkg
const cwd = process.cwd()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const componentDirPath = path.resolve(cwd, 'src/views')
const templatePath = path.resolve(__dirname, '../templates/view.ejs')
const routerFilePath = path.resolve(cwd, 'src/router/index.js')

const genView = async (dirname, filename, routerPath, options) => {
  if (!filename) {
    console.log(red('文件名称不能为空!'))
    return
  }
  if (!routerPath) {
    console.log(red('路由路径不能为空!'))
    return
  }
  const componentPath = dirname
    ? `${componentDirPath}/${dirname}/${filename}.vue`
    : `${componentDirPath}/${filename}.vue`

  if (fs.existsSync(componentPath)) {
    if (options.overwrite) {
      fs.unlinkSync(componentPath)
      await createComponent(dirname, filename, routerPath)
      return
    } else {
      console.log(blue('已取消操作'))
      process.exit(1)
    }
  } else {
    await createComponent(dirname, filename, routerPath)
    return
  }
}

async function createComponent(dirname, filename, routerPath) {
  const dirPath = `${componentDirPath}/${dirname}`
  const filePath = dirname
    ? `${componentDirPath}/${dirname}/${toUpperCase(filename)}.vue`
    : `${componentDirPath}/${toUpperCase(filename)}.vue`
  const routerContent = fs.readFileSync(routerFilePath, 'utf-8')
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
  const ast = parser.parse(routerContent, {
    sourceType: 'unambiguous'
  })
  let count = 0
  traverse(ast, {
    VariableDeclarator(node) {
      node.container.map((container) => {
        if (container.id.name === 'routes') {
          const newRoute = types.objectExpression([
            types.objectProperty(types.identifier('path'), types.stringLiteral(routerPath)),
            types.objectProperty(
              types.identifier('name'),
              types.stringLiteral(toLowerCase(filename))
            ),
            types.objectProperty(
              types.identifier('component'),
              types.identifier(toUpperCase(filename))
            ),
            types.objectProperty(
              types.identifier('meta'),
              types.objectExpression([
                types.objectProperty(
                  types.identifier('key'),
                  types.stringLiteral(toLowerCase(filename))
                )
              ])
            )
          ])
          container.init.elements.push(newRoute)
        }
      })
    },
    ImportDeclaration() {
      count++
    }
  })
  const componentFilename = dirname
    ? `${dirname}/${toUpperCase(filename)}.vue`
    : `${toUpperCase(filename)}.vue`
  const newRoute = types.importDeclaration(
    [types.importDefaultSpecifier(types.identifier(toUpperCase(filename)))],
    types.stringLiteral(`@/views/${componentFilename}`)
  )
  ast.program.body.splice(count, 0, newRoute)
  const result = generate(ast).code
  fs.writeFileSync(routerFilePath, result)
}

export const genViewCommandConfig = () => {
  program
    .command('gen-view <filename>')
    .description('生成一个新的视图组件')
    .option('-d, --dirname <dirname>', '指定文件夹名称')
    .option('-r, --router-path <routerPath>', '指定路由路径')
    .option('-o, --overwrite', '覆盖已存在的组件文件')
    .action((filename, options) => genView(options.dirname, filename, options.routerPath, options))
}
