import fs from 'fs-extra'
import pkg from 'picocolors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const cwd = process.cwd()
const { red } = pkg

const excludesFiles = [
  '.DS_Store',
  '.gitignore',
  'node_modules',
  'package.json',
  'package-lock.json',
  '.git',
  '.vscode'
]

function getJsonFiles(jsonPath) {
  let jsonFiles = []
  function findJsonFile(currentPath) {
    let files = fs.readdirSync(currentPath)
    files.forEach((item) => {
      if (excludesFiles.includes(item)) return
      let fPath = path.join(currentPath, item)
      let stat = fs.statSync(fPath)
      if (stat.isDirectory() === true) {
        findJsonFile(fPath)
      }
      if (stat.isFile() === true) {
        jsonFiles.push(fPath)
      }
    })
  }
  findJsonFile(jsonPath)
  return jsonFiles
}

export const statisticsCommand = () => {
  let files = getJsonFiles(cwd)
  let count = 0
  files.map((item) => {
    let text = fs.readFileSync(item)
    count += text.length
  })
  console.log(`该项目总共有 ${red(count)} 个字符, 大约有 ${red(Math.round(count / 25))} 行代码`)
}
