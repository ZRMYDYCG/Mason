import inquirer from 'inquirer'
import fs from 'fs-extra'
import pkg from 'picocolors'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const { red, yellow, green } = pkg

export const createFileCommand = () => {
  inquirer
    .prompt([
      {
        name: 'type',
        type: 'list',
        message: '请选择文件类型',
        choices: ['js', 'ts', 'html', 'css', 'scss', 'less']
      },
      {
        name: 'dirname',
        type: 'input',
        message: '请输入文件夹名称(默认src文件夹, 如需创建在其他文件夹,请以../开头)'
      },
      {
        name: 'filename',
        type: 'input',
        message: '请输入文件名称',
        validate: (value) => {
          if (value.length) {
            return true
          } else {
            return '请输入文件名称'
          }
        }
      }
    ])
    .then((answers) => {
      let type = answers.type
      let dirname = answers.dirname
      let filename = answers.filename
      let file = ''
      let dir = ''
      if (answers.dirname.includes('../')) {
        dir = `./${dirname.slice(3)}`
        file = `./${dirname.slice(3)}/${filename}.${type}`
      } else {
        dir = `./src/${dirname}`
        file = dirname !== '' ? `./src/${dirname}/${filename}.${type}` : `./src/${filename}.${type}`
      }
      // 检查文件夹是否存在
      if (dirname === '') {
        fs.access(file, (err) => {
          if (!err) {
            console.log('创建失败：', yellow('文件已存在'))
          } else {
            fs.writeFile(file, '', function (err1) {
              if (err1) {
                console.log('创建失败：', red(err1))
              } else {
                console.log(green(`创建文件成功！${file} `))
              }
            })
          }
        })
      } else {
        fs.access(dir, (err) => {
          if (!err) {
            inquirer
              .prompt([
                {
                  name: 'continue',
                  type: 'list',
                  message: '文件夹已经存在,是否在此文件夹继续创建文件',
                  choices: ['继续', '取消']
                }
              ])
              .then((res) => {
                if (res.continue === '继续') {
                  fs.access(file, (err1) => {
                    if (!err1) {
                      console.log('创建失败：', yellow('文件已存在'))
                    } else {
                      fs.writeFile(file, '', function (err2) {
                        if (err2) {
                          console.log('创建失败：', red(err2))
                        } else {
                          console.log(green(`创建文件成功！${file} `))
                        }
                      })
                    }
                  })
                } else {
                  return false
                }
              })
          } else {
            fs.mkdirSync(dir)
            // 检验当前文件夹下是否有同名文件
            fs.access(file, (err) => {
              if (!err) {
                console.log('创建失败：', yellow('文件已存在'))
              } else {
                fs.writeFile(file, '', function (err1) {
                  if (err1) {
                    console.log('创建失败：', red(err1))
                  } else {
                    console.log(green(`创建文件成功！${file} `))
                  }
                })
              }
            })
          }
        })
      }
    })
}
