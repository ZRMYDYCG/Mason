import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { formatMenus } from '../utils/format'

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async getMenuListByRoleId(roleId: number, search: any) {
    const rows = await this.prisma.sysRoleMenu.findMany({
      where: { roleId: BigInt(roleId) },
      include: { menu: true }
    })
    const title = search.title || ''
    const menus = rows
      .map((row) => row.menu)
      .filter((menu) => !menu.deletedAt)
      .filter((menu) => menu.title.includes(title))
      .filter((menu) => (search.isEnable === 0 || search.isEnable === 1 ? menu.isEnable === search.isEnable : true))
    return formatMenus(menus)
  }

  async getAllMenuList() {
    const menus = await this.prisma.sysMenu.findMany({
      where: { deletedAt: null },
      orderBy: { sort: 'asc' }
    })
    return formatMenus(menus)
  }

  getMenuByName(name: string) {
    return this.prisma.sysMenu.findFirst({ where: { name, deletedAt: null } })
  }

  getMenuById(id: number) {
    return this.prisma.sysMenu.findFirst({ where: { id: BigInt(id), deletedAt: null } })
  }

  async addMenu(menu: any, roleId: number) {
    const newMenu = await this.prisma.sysMenu.create({ data: menu })
    await this.prisma.sysRoleMenu.create({ data: { roleId: BigInt(roleId), menuId: newMenu.id } })
    if (roleId !== 1) {
      await this.prisma.sysRoleMenu.upsert({
        where: { roleId_menuId: { roleId: 1n, menuId: newMenu.id } },
        update: {},
        create: { roleId: 1n, menuId: newMenu.id }
      })
    }
    return 'ok'
  }

  async updateMenu(menu: any) {
    const { id, ...data } = menu
    await this.prisma.sysMenu.update({ where: { id: BigInt(id) }, data })
    return 'ok'
  }

  async deleteMenu(id: number) {
    await this.prisma.sysMenu.update({ where: { id: BigInt(id) }, data: { deletedAt: new Date() } })
    await this.prisma.sysRoleMenu.deleteMany({ where: { menuId: BigInt(id) } })
    return 'ok'
  }
}
