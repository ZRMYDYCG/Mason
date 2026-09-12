import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import jwt from 'jsonwebtoken'
import { AbilityFactory } from '../casl/ability.factory'
import { PERMISSION_KEY } from '../casl/check-permission.decorator'
import { AUTH_COOKIE_NAME, ERROR_TYPES, readPublicKey } from '../config/constants'
import { AppError } from '../common/app-error'
import { PrismaService } from '../prisma/prisma.service'
import { splitPermission } from '../casl/permissions'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
    private readonly abilityFactory: AbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const code = this.reflector.getAllAndOverride<string>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    const authorization = request.headers.authorization
    const headerToken =
      typeof authorization === 'string' ? authorization.replace('Bearer ', '') : ''
    const cookieToken = request.cookies?.[AUTH_COOKIE_NAME] || ''
    const token = headerToken || cookieToken
    if (!token) throw new AppError(ERROR_TYPES.UNAUTHORIZATION, 401, 401)

    try {
      request.user = jwt.verify(token, readPublicKey(), { algorithms: ['RS256'] })
    } catch {
      throw new AppError(ERROR_TYPES.UNAUTHORIZATION, 401, 401)
    }

    if (!code) return true

    const dbUser = await this.prisma.sysUser.findFirst({
      where: { id: BigInt(request.user.id), deletedAt: null },
      include: {
        userRoles: {
          where: { deletedAt: null },
          include: {
            role: {
              include: { rolePermissions: { include: { permission: true } } }
            }
          }
        }
      }
    })
    if (!dbUser) throw new AppError(ERROR_TYPES.UNAUTHORIZATION)

    const roles = dbUser.userRoles.map((item) => item.role)
    const isSuper = roles.some((role) => role.isSuper === 1)
    const codes = roles.flatMap((role) => role.rolePermissions.map((rp) => rp.permission.code))
    const ability = this.abilityFactory.createForCodes(codes, isSuper)
    const { resource, action } = splitPermission(code)
    if (!ability.can(action, resource) && !ability.can('manage', 'all')) {
      throw new AppError(ERROR_TYPES.UNPERMISSION)
    }

    return true
  }
}
