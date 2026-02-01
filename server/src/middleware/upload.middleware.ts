import multer from 'koa-multer'
import path from 'path'
import fs from 'fs'

// 确保上传目录存在
const uploadDir = path.join(__dirname, '../../public/uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// 配置 storage
const storage = multer.diskStorage({
  // 文件保存路径
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  // 修改文件名称
  filename: (req, file, cb) => {
    console.log(file)
    const fileFormat = file.originalname.split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

// 文件上传限制
const limits = {
  fields: 10, // 非文件字段的数量
  fileSize: 12 * 500 * 1024, // 单位 b
  files: 1 // 文件的数量
}

// 加载配置
const upload = multer({ storage: storage, limits })

export default upload
