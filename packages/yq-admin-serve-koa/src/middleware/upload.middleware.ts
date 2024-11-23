import multer from 'koa-multer'
import path from 'path'

// 配置 storage
const storage = multer.diskStorage({
  // 文件保存路径
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'))
  },
  // 修改文件名称
  filename: (req, file, cb) => {
    console.log(file)
    const fileFormat = file.originalname.split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  },
})

// 文件上传限制
const limits = {
  fields: 10, // 非文件字段的数量
  fileSize: 12 * 500 * 1024, // 单位 b
  files: 1, // 文件的数量
}

// 加载配置
const upload = multer({ storage: storage, limits })

export default upload
