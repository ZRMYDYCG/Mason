import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import fs from 'fs'
import path from 'path'
import { AuthGuard } from '../auth/auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'
import { CheckPermission } from '../casl/check-permission.decorator'
import { PERMISSION_CODES } from '../casl/permissions'
import { AppError } from '../common/app-error'
import { ZodBodyPipe } from '../common/zod-validation.pipe'
import { ERROR_TYPES } from '../config/constants'
import { RoleService } from '../role/role.service'
import { UserService } from './user.service'
import { idSchema, userCreateSchema, userListSchema, userUpdateSchema } from './user.schemas'

const uploadDir = path.join(process.cwd(), 'public/uploads')
fs.mkdirSync(uploadDir, { recursive: true })
const storage = diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    const parts = file.originalname.split('.')
    cb(null, `${Date.now()}.${parts[parts.length - 1]}`)
  }
})

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService
  ) {}

  @Post('list')
  @CheckPermission(PERMISSION_CODES.USER_LIST)
  async userList(@Body(new ZodBodyPipe(userListSchema)) body: any) {
    return { code: 200, data: await this.userService.getUserList(body), msg: '获取成功' }
  }

  @Post('add')
  @CheckPermission(PERMISSION_CODES.USER_ADD)
  async addUser(@Body(new ZodBodyPipe(userCreateSchema)) body: any, @CurrentUser() current: any) {
    if (await this.userService.getUserByName(body.username)) throw new AppError(ERROR_TYPES.USER_ALREADY_EXISTS)
    const loginUser = await this.userService.getUserInfoById(current.id)
    const selectRole = await this.roleService.getRoleById(body.roleId)
    if (!selectRole) throw new AppError(ERROR_TYPES.ROLE_NOT_EXISTS)
    if (loginUser?.isSuper === 0 && selectRole.isSuper === 1) throw new AppError(ERROR_TYPES.UNPERMISSION)
    return { code: 200, data: await this.userService.addNewUser(body), msg: '添加用户成功' }
  }

  @Post('update-profile')
  @CheckPermission(PERMISSION_CODES.USER_UPDATE_PROFILE)
  @UseInterceptors(FileInterceptor('avatar', { storage, limits: { fields: 10, fileSize: 12 * 500 * 1024, files: 1 } }))
  async updateProfile(@Body() body: any, @UploadedFile() file: Express.Multer.File, @CurrentUser() user: any) {
    const avatar = file ? `http://${process.env.APP_HOST || 'localhost'}:${process.env.APP_PORT || 8000}/public/uploads/${file.filename}` : undefined
    await this.userService.updateProfile({ id: user.id, ...body, ...(avatar && { avatar }) })
    return { code: 200, msg: '修改成功', data: { avatar } }
  }

  @Post('update')
  @CheckPermission(PERMISSION_CODES.USER_UPDATE)
  async updateUser(@Body(new ZodBodyPipe(userUpdateSchema)) body: any, @CurrentUser() current: any) {
    if (body.id === 1) throw new AppError(ERROR_TYPES.INITIAL_ADMIN_CANNOT_BE_MODIFIED)
    const loginUser = await this.userService.getUserInfoById(current.id)
    const editUser = await this.userService.getUserInfoById(body.id)
    if (editUser && editUser.isSuper === 1 && loginUser?.isSuper === 0) throw new AppError(ERROR_TYPES.UNPERMISSION)
    const existing = await this.userService.getUserByName(body.username)
    if (existing && Number(existing.id) !== body.id) throw new AppError(ERROR_TYPES.USER_ALREADY_EXISTS)
    await this.userService.updateUser(body)
    return { code: 200, msg: '修改成功' }
  }

  @Post('delete')
  @CheckPermission(PERMISSION_CODES.USER_DELETE)
  async deleteUser(@Body(new ZodBodyPipe(idSchema)) body: any, @CurrentUser() current: any) {
    if (body.id === 1) throw new AppError(ERROR_TYPES.INITIAL_ADMIN_CANNOT_BE_DELETED)
    if (body.id === current.id) throw new AppError(ERROR_TYPES.CANNOT_DELETE_SELF)
    await this.userService.deleteUser(body.id)
    return { code: 200, msg: '删除成功' }
  }

  @Get(':userId')
  @CheckPermission(PERMISSION_CODES.USER_INFO)
  async userInfo(@Param('userId') userId: string) {
    const result = await this.userService.getUserInfoById(Number(userId))
    if (!result) throw new AppError(ERROR_TYPES.USER_NOT_EXISTS)
    return { code: 200, data: result, msg: '获取成功' }
  }
}
