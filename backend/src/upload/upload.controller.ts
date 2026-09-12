import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import fs from 'fs'
import path from 'path'
import { AuthGuard } from '../auth/auth.guard'
import { CheckPermission } from '../casl/check-permission.decorator'
import { PERMISSION_CODES } from '../casl/permissions'

const uploadDir = path.join(process.cwd(), 'public/uploads')
fs.mkdirSync(uploadDir, { recursive: true })
const storage = diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    const parts = file.originalname.split('.')
    cb(null, `${Date.now()}.${parts[parts.length - 1]}`)
  }
})

@Controller('upload')
@UseGuards(AuthGuard)
export class UploadController {
  @Post('single')
  @CheckPermission(PERMISSION_CODES.UPLOAD_SINGLE)
  @UseInterceptors(FileInterceptor('file', { storage, limits: { fields: 10, fileSize: 12 * 500 * 1024, files: 1 } }))
  upload(@UploadedFile() file: Express.Multer.File) {
    return { code: 200, avatarUrl: `http://localhost:3000/public/uploads/${file.filename}` }
  }
}
