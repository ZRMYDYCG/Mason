import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'
import { CheckPermission } from '../casl/check-permission.decorator'
import { PERMISSION_CODES } from '../casl/permissions'
import { AppError } from '../common/app-error'
import { ZodBodyPipe } from '../common/zod-validation.pipe'
import { ERROR_TYPES } from '../config/constants'
import { UserService } from '../user/user.service'
import { MenuService } from './menu.service'
import { idSchema, menuCreateSchema, menuListSchema, menuUpdateSchema } from './menu.schemas'

@Controller('menu')
@UseGuards(AuthGuard)
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly userService: UserService
  ) {}

  @Post('list')
  @CheckPermission(PERMISSION_CODES.MENU_LIST)
  async menuListByRole(@Body(new ZodBodyPipe(menuListSchema)) body: any, @CurrentUser() current: any) {
    const user = await this.userService.getUserInfoById(current.id)
    if (!user) throw new AppError(ERROR_TYPES.USER_NOT_EXISTS)
    return { code: 200, data: await this.menuService.getMenuListByRoleId(Number(user.roleId), body), msg: '获取菜单列表成功' }
  }

  @Post('listAll')
  @CheckPermission(PERMISSION_CODES.MENU_LIST_ALL)
  async allMenuList() {
    return { code: 200, data: await this.menuService.getAllMenuList(), msg: '获取菜单列表成功' }
  }

  @Post('add')
  @CheckPermission(PERMISSION_CODES.MENU_ADD)
  async addMenu(@Body(new ZodBodyPipe(menuCreateSchema)) body: any, @CurrentUser() current: any) {
    if (await this.menuService.getMenuByName(body.name)) throw new AppError(ERROR_TYPES.MENU_ALREADY_EXISTS)
    const user = await this.userService.getUserInfoById(current.id)
    if (!user) throw new AppError(ERROR_TYPES.USER_NOT_EXISTS)
    return { code: 200, data: await this.menuService.addMenu(body, Number(user.roleId)), msg: '添加菜单成功' }
  }

  @Post('update')
  @CheckPermission(PERMISSION_CODES.MENU_UPDATE)
  async updateMenu(@Body(new ZodBodyPipe(menuUpdateSchema)) body: any) {
    const oldMenu = await this.menuService.getMenuByName(body.name)
    if (oldMenu && Number(oldMenu.id) !== body.id) throw new AppError(ERROR_TYPES.MENU_ALREADY_EXISTS)
    return { code: 200, data: await this.menuService.updateMenu(body), msg: '更新菜单成功' }
  }

  @Post('delete')
  @CheckPermission(PERMISSION_CODES.MENU_DELETE)
  async deleteMenu(@Body(new ZodBodyPipe(idSchema)) body: any) {
    if (!(await this.menuService.getMenuById(body.id))) throw new AppError(ERROR_TYPES.MENU_NOT_EXISTS)
    return { code: 200, data: await this.menuService.deleteMenu(body.id), msg: '删除菜单成功' }
  }
}
