import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'
import { CheckPermission } from '../casl/check-permission.decorator'
import { PERMISSION_CODES } from '../casl/permissions'
import { AppError } from '../common/app-error'
import { ZodBodyPipe } from '../common/zod-validation.pipe'
import { ERROR_TYPES } from '../config/constants'
import { UserService } from '../user/user.service'
import { RoleService } from './role.service'
import { idSchema, roleCreateSchema, roleListSchema, roleUpdateSchema, useMenusSchema } from './role.schemas'

@Controller('role')
@UseGuards(AuthGuard)
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService
  ) {}

  @Post('list')
  @CheckPermission(PERMISSION_CODES.ROLE_LIST)
  async getRoleList(@Body(new ZodBodyPipe(roleListSchema)) body: any) {
    return { code: 200, data: await this.roleService.getRoleList(body), msg: '获取成功' }
  }

  @Post('listAll')
  @CheckPermission(PERMISSION_CODES.ROLE_LIST_ALL)
  async getRoleAllList() {
    return { code: 200, data: await this.roleService.getRoleAllList(), msg: '获取成功' }
  }

  @Post('add')
  @CheckPermission(PERMISSION_CODES.ROLE_ADD)
  async addRole(@Body(new ZodBodyPipe(roleCreateSchema)) body: any, @CurrentUser() current: any) {
    const loginUser = await this.userService.getUserInfoById(current.id)
    if (loginUser?.isSuper === 0) body.isSuper = 0
    if (await this.roleService.getRoleByName(body.role)) throw new AppError(ERROR_TYPES.ROLE_ALREADY_EXISTS)
    return { code: 200, data: await this.roleService.addNewRole(body), msg: '添加角色成功' }
  }

  @Post('update')
  @CheckPermission(PERMISSION_CODES.ROLE_UPDATE)
  async updateRole(@Body(new ZodBodyPipe(roleUpdateSchema)) body: any, @CurrentUser() current: any) {
    if (body.id === 1) throw new AppError(ERROR_TYPES.INITIAL_ROLE_CANNOT_BE_MODIFIED)
    const loginUser = await this.userService.getUserInfoById(current.id)
    if (loginUser?.isSuper === 0 && body.isSuper === 1) throw new AppError(ERROR_TYPES.UNPERMISSION)
    const editRole = await this.roleService.getRoleById(body.id)
    if (editRole && editRole.isSuper === 1 && loginUser?.isSuper === 0) throw new AppError(ERROR_TYPES.UNPERMISSION)
    const oldRole = await this.roleService.getRoleByName(body.role)
    if (oldRole && Number(oldRole.id) !== body.id) throw new AppError(ERROR_TYPES.ROLE_ALREADY_EXISTS)
    return { code: 200, data: await this.roleService.updateRole(body), msg: '更新角色成功' }
  }

  @Post('delete')
  @CheckPermission(PERMISSION_CODES.ROLE_DELETE)
  async deleteRole(@Body(new ZodBodyPipe(idSchema)) body: any) {
    if (body.id === 1 || body.id === 2) throw new AppError(ERROR_TYPES.INITIAL_ROLE_CANNOT_BE_DELETED)
    const role = await this.roleService.getRoleById(body.id)
    if (!role) throw new AppError(ERROR_TYPES.ROLE_NOT_EXISTS)
    const users = await this.roleService.getUserByRoleId(body.id)
    if (users.length > 0) throw new AppError(ERROR_TYPES.ROLE_HAS_ASSOCIATED_USERS)
    return { code: 200, data: await this.roleService.deleteRole(body.id), msg: '删除角色成功' }
  }

  @Post('useMenus')
  @CheckPermission(PERMISSION_CODES.ROLE_USE_MENUS)
  async getUseMenus(@Body(new ZodBodyPipe(useMenusSchema)) body: any) {
    return { code: 200, data: await this.roleService.getMenuIdsByRoleId(body.roleId), msg: '获取成功' }
  }
}
