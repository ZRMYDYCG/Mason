import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { CheckPermission } from '../casl/check-permission.decorator'
import { PERMISSION_CODES } from '../casl/permissions'
import { AppError } from '../common/app-error'
import { ZodBodyPipe } from '../common/zod-validation.pipe'
import { AUTH_COOKIE_NAME, ERROR_TYPES, readPrivateKey } from '../config/constants'
import { UserService } from '../user/user.service'
import { AuthGuard } from './auth.guard'
import { CurrentUser } from './current-user.decorator'

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  expires7d: z.boolean().optional().default(false)
})

type LoginBody = z.infer<typeof loginSchema>

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body(new ZodBodyPipe(loginSchema)) body: LoginBody,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = await this.userService.getUserByName(body.username)
    if (!user) throw new AppError(ERROR_TYPES.USER_NOT_EXISTS)
    if (!bcrypt.compareSync(body.password, user.password)) {
      throw new AppError(ERROR_TYPES.PASSWORD_IS_INCORRECT)
    }
    const expires = body.expires7d ? '7d' : '24h'
    const maxAge = body.expires7d ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
    const token = jwt.sign({ id: Number(user.id), username: user.username }, readPrivateKey(), {
      expiresIn: expires,
      algorithm: 'RS256'
    })
    res.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge,
      path: '/'
    })
    return {
      code: 200,
      data: {
        id: Number(user.id),
        username: user.username,
        expires: Math.floor((Date.now() + maxAge) / 1000)
      },
      msg: '登录成功'
    }
  }

  @Post('register')
  async register(@Body(new ZodBodyPipe(loginSchema)) body: LoginBody) {
    const existing = await this.userService.getUserByName(body.username)
    if (existing) throw new AppError(ERROR_TYPES.USER_ALREADY_EXISTS)
    await this.userService.addNewUser({
      username: body.username,
      password: bcrypt.hashSync(body.password, 10),
      roleId: 2,
      deptId: 1,
      name: body.username,
      email: '',
      phone: '',
      remark: '用户自行注册'
    })
    return { code: 200, msg: '注册成功' }
  }

  @Get('test')
  @UseGuards(AuthGuard)
  @CheckPermission(PERMISSION_CODES.AUTH_TEST)
  success(@CurrentUser() user: CurrentUser) {
    return { code: 200, data: user, msg: '授权成功' }
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.cookie(AUTH_COOKIE_NAME, '', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
      expires: new Date(0),
      path: '/'
    })
    return { code: 200, data: null, msg: '退出成功' }
  }
}
