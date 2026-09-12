import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { serializeBigInt } from '../utils/format'

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  getRoleById(id: number) {
    return this.prisma.sysRole.findUnique({ where: { id: BigInt(id) } })
  }

  getRoleByName(role: string) {
    return this.prisma.sysRole.findFirst({ where: { role } })
  }

  async getMenuIdsByRoleId(roleId: number) {
    const rows = await this.prisma.sysRoleMenu.findMany({ where: { roleId: BigInt(roleId) } })
    return rows.map((item) => Number(item.menuId))
  }

  async getRoleList(params: any) {
    const where: any = { role: { contains: params.role || '' } }
    if (params.isSuper === 0 || params.isSuper === 1) where.isSuper = params.isSuper
    const [count, rows] = await Promise.all([
      this.prisma.sysRole.count({ where }),
      this.prisma.sysRole.findMany({
        where,
        skip: params.pageSize * (params.pageNo - 1),
        take: params.pageSize
      })
    ])
    return serializeBigInt({ count, rows: rows.map(({ updatedAt, ...row }) => row) })
  }

  async getRoleAllList() {
    const roles = await this.prisma.sysRole.findMany()
    return serializeBigInt(roles.map(({ updatedAt, ...role }) => role))
  }

  async addNewRole(params: any) {
    await this.prisma.$transaction(async (tx) => {
      const newRole = await tx.sysRole.create({
        data: { role: params.role, roleName: params.roleName, isSuper: params.isSuper, remark: params.remark }
      })
      if (params.menus?.length) {
        await tx.sysRoleMenu.createMany({
          data: params.menus.map((menuId: number) => ({ roleId: newRole.id, menuId: BigInt(menuId) }))
        })
      }
    })
    return 'ok'
  }

  async updateRole(params: any) {
    await this.prisma.$transaction(async (tx) => {
      await tx.sysRole.update({
        where: { id: BigInt(params.id) },
        data: { role: params.role, roleName: params.roleName, isSuper: params.isSuper, remark: params.remark }
      })
      await tx.sysRoleMenu.deleteMany({ where: { roleId: BigInt(params.id) } })
      if (params.menus?.length) {
        await tx.sysRoleMenu.createMany({
          data: params.menus.map((menuId: number) => ({ roleId: BigInt(params.id), menuId: BigInt(menuId) }))
        })
      }
    })
    return 'ok'
  }

  async deleteRole(id: number) {
    await this.prisma.$transaction(async (tx) => {
      await tx.sysRoleMenu.deleteMany({ where: { roleId: BigInt(id) } })
      await tx.sysRolePermission.deleteMany({ where: { roleId: BigInt(id) } })
      await tx.sysRole.delete({ where: { id: BigInt(id) } })
    })
    return 'ok'
  }

  getUserByRoleId(roleId: number) {
    return this.prisma.sysUserRole.findMany({ where: { roleId: BigInt(roleId), deletedAt: null } })
  }
}
