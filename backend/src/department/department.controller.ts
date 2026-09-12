import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { CheckPermission } from '../casl/check-permission.decorator'
import { PERMISSION_CODES } from '../casl/permissions'
import { AppError } from '../common/app-error'
import { ZodBodyPipe } from '../common/zod-validation.pipe'
import { ERROR_TYPES } from '../config/constants'
import { DepartmentService } from './department.service'
import {
  DeptCreateBody,
  DeptUpdateBody,
  IdBody,
  deptCreateSchema,
  deptUpdateSchema,
  idSchema
} from './department.schemas'

@Controller('department')
@UseGuards(AuthGuard)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('listAll')
  @CheckPermission(PERMISSION_CODES.DEPARTMENT_LIST_ALL)
  async allDepartmentList() {
    return {
      code: 200,
      data: await this.departmentService.getAllDepartmentList(),
      msg: '获取部门列表成功'
    }
  }

  @Post('add')
  @CheckPermission(PERMISSION_CODES.DEPARTMENT_ADD)
  async addDepartment(@Body(new ZodBodyPipe(deptCreateSchema)) body: DeptCreateBody) {
    return { code: 200, data: await this.departmentService.addDept(body), msg: '添加部门成功' }
  }

  @Post('update')
  @CheckPermission(PERMISSION_CODES.DEPARTMENT_UPDATE)
  async updateDepartment(@Body(new ZodBodyPipe(deptUpdateSchema)) body: DeptUpdateBody) {
    return { code: 200, data: await this.departmentService.updateDept(body), msg: '更新部门成功' }
  }

  @Post('delete')
  @CheckPermission(PERMISSION_CODES.DEPARTMENT_DELETE)
  async deleteDepartment(@Body(new ZodBodyPipe(idSchema)) body: IdBody) {
    if (!(await this.departmentService.getDeptById(body.id))) {
      throw new AppError(ERROR_TYPES.DEPT_NOT_EXISTS)
    }
    const result = await this.departmentService.deleteDept(body.id)
    if (!result) throw new AppError(ERROR_TYPES.DEPT_HAS_ASSOCIATED_USERS)
    return { code: 200, data: 'ok', msg: '删除部门成功' }
  }
}
