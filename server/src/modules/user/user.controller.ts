import { Context } from 'koa'
import userService from './user.service'
import { userSearchSchema, userUpdateSchema } from './user.dto'
import { ERROR_TYPES } from '../../constant'
import { UserPageParams, UpdateUserParams } from '../../types/index'

class UserController {
  async userInfo(ctx: Context) {
    const { userId } = ctx.params
    const result = await userService.getUserInfoById(Number(userId))
    
    if (!result) {
      throw new Error(ERROR_TYPES.USER_NOT_EXISTS)
    }
    
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取成功',
    }
  }

  async userList(ctx: Context) {
    const searchParams = ctx.request.body as UserPageParams
    await userSearchSchema.validateAsync(searchParams)
    
    const result = await userService.getUserList(searchParams)
    
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取成功',
    }
  }

  async addUser(ctx: Context) {
    // 这里的参数校验依然依赖于外部中间件（为了兼容现有路由逻辑），也可以迁移到DTO
    const result = await userService.addNewUser(ctx.user)
    ctx.body = {
      code: 200,
      data: result,
      msg: '添加用户成功',
    }
  }

  async updateUser(ctx: Context) {
    const user = ctx.request.body as UpdateUserParams
    await userUpdateSchema.validateAsync(user)

    // 业务规则校验
    if (user.id === 1) {
      throw new Error(ERROR_TYPES.INITIAL_ADMIN_CANNOT_BE_MODIFIED)
    }

    const loginUser = await userService.getUserInfoById(ctx.user.id)
    const editUser = await userService.getUserInfoById(user.id)
    
    if (editUser && editUser.isSuper === 1 && loginUser?.isSuper === 0) {
      throw new Error(ERROR_TYPES.UNPERMISSION)
    }

    const existUser = await userService.getUserByName(user.username)
    if (existUser && existUser.id !== user.id) {
      throw new Error(ERROR_TYPES.USER_ALREADY_EXISTS)
    }

    await userService.updateUser(user)

    ctx.body = {
      code: 200,
      msg: '修改成功',
    }
  }

  async deleteUser(ctx: Context) {
     // 删除逻辑也应该迁移过来，这里为了演示简洁暂时保留
     // 需要实现 userService.deleteUser(id)
     const { id } = ctx.request.body as { id: number }
     // 简单校验
     if(!id) throw new Error('Id is required');

     await userService.deleteUser(id);
     ctx.body = { code: 200, msg: '删除成功' }
  }
}

export default new UserController()
