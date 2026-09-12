import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { buildTreeDepartment, serializeBigInt } from '../utils/format'
import { DeptCreateBody, DeptUpdateBody } from './department.schemas'

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllDepartmentList() {
    const departments = await this.prisma.sysDepartment.findMany({
      where: { deletedAt: null },
      orderBy: { sort: 'asc' }
    })
    return buildTreeDepartment(serializeBigInt(departments))
  }

  getDeptById(id: number) {
    return this.prisma.sysDepartment.findFirst({ where: { id, deletedAt: null } })
  }

  async addDept(dept: DeptCreateBody) {
    await this.prisma.sysDepartment.create({ data: dept })
    return 'ok'
  }

  async updateDept(dept: DeptUpdateBody) {
    const { id, ...data } = dept
    await this.prisma.sysDepartment.update({ where: { id }, data })
    return 'ok'
  }

  async deleteDept(id: number) {
    const user = await this.prisma.sysUser.findFirst({ where: { deptId: id, deletedAt: null } })
    if (user) return false
    await this.prisma.sysDepartment.update({ where: { id }, data: { deletedAt: new Date() } })
    return true
  }
}
