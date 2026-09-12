import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { PrismaService } from '../prisma/prisma.service'
import { serializeBigInt, omitKeys } from '../utils/format'
import { UserCreateBody, UserListBody, UserProfileUpdateBody, UserUpdateBody } from './user.schemas'

type UserProfilePayload = UserProfileUpdateBody & {
  id: number
  avatar?: string
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserByName(username: string) {
    return this.prisma.sysUser.findFirst({ where: { username, deletedAt: null } })
  }

  async getUserInfoById(id: number) {
    const user = await this.prisma.sysUser.findFirst({
      where: { id: BigInt(id), deletedAt: null },
      include: { userRoles: { where: { deletedAt: null }, include: { role: true } } }
    })
    if (!user) return null
    const role = user.userRoles[0]?.role
    const rest = omitKeys(user, ['password', 'userRoles', 'updatedAt', 'deletedAt'])
    return serializeBigInt({
      ...rest,
      roleId: role?.id,
      role: role?.role,
      roleName: role?.roleName,
      isSuper: role?.isSuper
    })
  }

  async getUserList(params: UserListBody) {
    const deptIds = await this.getDeptIds(params.deptId)
    const where: Prisma.SysUserWhereInput = {
      deletedAt: null,
      username: { contains: params.username || '' },
      deptId: { in: deptIds }
    }
    const [count, rows] = await Promise.all([
      this.prisma.sysUser.count({ where }),
      this.prisma.sysUser.findMany({
        where,
        include: { userRoles: { where: { deletedAt: null }, include: { role: true } } },
        skip: params.pageSize * (params.pageNo - 1),
        take: params.pageSize
      })
    ])
    return serializeBigInt({
      count,
      rows: rows.map((user) => {
        const role = user.userRoles[0]?.role
        const rest = omitKeys(user, ['password', 'userRoles', 'updatedAt', 'deletedAt'])
        return {
          ...rest,
          roleId: role?.id,
          role: role?.role,
          roleName: role?.roleName
        }
      })
    })
  }

  async addNewUser(user: UserCreateBody) {
    await this.prisma.$transaction(async (tx) => {
      const newUser = await tx.sysUser.create({
        data: {
          username: user.username,
          password: user.password.startsWith('$2')
            ? user.password
            : bcrypt.hashSync(user.password, 10),
          deptId: user.deptId || 1,
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          remark: user.remark || ''
        }
      })
      await tx.sysUserRole.create({
        data: { userId: newUser.id, roleId: BigInt(user.roleId) }
      })
    })
    return 'ok'
  }

  async updateUser(user: UserUpdateBody) {
    await this.prisma.$transaction(async (tx) => {
      await tx.sysUser.update({
        where: { id: BigInt(user.id) },
        data: {
          username: user.username,
          name: user.name,
          deptId: user.deptId,
          email: user.email,
          phone: user.phone,
          remark: user.remark
        }
      })
      const existing = await tx.sysUserRole.findFirst({ where: { userId: BigInt(user.id) } })
      if (existing) {
        await tx.sysUserRole.update({
          where: { userId_roleId: { userId: existing.userId, roleId: existing.roleId } },
          data: { roleId: BigInt(user.roleId), deletedAt: null }
        })
      } else {
        await tx.sysUserRole.create({
          data: { userId: BigInt(user.id), roleId: BigInt(user.roleId) }
        })
      }
    })
    return 'ok'
  }

  async updateProfile(user: UserProfilePayload) {
    const data: Prisma.SysUserUpdateInput = {}
    if (user.name !== undefined) data.name = user.name
    if (user.email !== undefined) data.email = user.email
    if (user.phone !== undefined) data.phone = user.phone
    if (user.remark !== undefined) data.remark = user.remark
    if (user.avatar !== undefined) data.avatar = user.avatar
    await this.prisma.sysUser.update({ where: { id: BigInt(user.id) }, data })
    return 'ok'
  }

  async deleteUser(id: number) {
    await this.prisma.$transaction(async (tx) => {
      await tx.sysUserRole.deleteMany({ where: { userId: BigInt(id) } })
      await tx.sysUser.delete({ where: { id: BigInt(id) } })
    })
    return 'ok'
  }

  private async getDeptIds(deptId: number): Promise<number[]> {
    const ids = [deptId]
    const walk = async (id: number) => {
      const children = await this.prisma.sysDepartment.findMany({
        where: { parentId: id, deletedAt: null },
        select: { id: true }
      })
      for (const child of children) {
        ids.push(child.id)
        await walk(child.id)
      }
    }
    await walk(deptId)
    return ids
  }
}
