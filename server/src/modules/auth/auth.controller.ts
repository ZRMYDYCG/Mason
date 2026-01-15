import type { Context } from 'koa'
import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../../config/index'
import { LoginParams } from '../../types/index'
import { PasswordToHash } from '../../utils/index'
import userService from '../user/user.service'

class AuthController {
  async login(ctx: Context) {
    const { id, username } = ctx.user
    const { expires7d } = ctx.request.body as LoginParams
    // token 有效期
    const expires = expires7d ? '7d' : '24h'

    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: expires,
      algorithm: 'RS256',
    })

    ctx.body = {
      code: 200,
      data: {
        id,
        username,
        token,
        expires: getTimestamps(expires === '7d'),
      },
      msg: '登录成功',
    }
  }

  async register(ctx: Context) {
    const { username, password } = ctx.request.body as LoginParams

    // 默认角色和部门
    // 假设角色 ID 2 为普通用户，部门 ID 1 为默认部门
    const defaultRoleId = 2
    const defaultDeptId = 1

    const newUser = {
      username,
      password: PasswordToHash(password), // 密码加密
      roleId: defaultRoleId,
      deptId: defaultDeptId,
      name: username, // 默认昵称为用户名
      email: '',
      phone: '',
      remark: '用户自行注册',
    }

    // 调用 userService 创建用户
    await userService.addNewUser(newUser as any)

    ctx.body = {
      code: 200,
      msg: '注册成功',
    }
  }

  async success(ctx: Context) {
    const user = ctx.user
    ctx.body = {
      code: 200,
      data: user,
      msg: '授权成功',
    }
  }
}

// 秒级时间戳
function getTimestamps(expires7d: boolean) {
  const now = Date.now()
  if (expires7d) {
    return Math.floor((now + 7 * 24 * 60 * 60 * 1000) / 1000)
  } else {
    return Math.floor((now + 24 * 60 * 60 * 1000) / 1000)
  }
}

export default new AuthController()
