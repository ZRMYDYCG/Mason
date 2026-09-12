import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export interface CurrentUser {
  id: number
  username: string
  iat?: number
  exp?: number
}

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().user as CurrentUser
})
