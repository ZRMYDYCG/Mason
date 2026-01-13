import { Op, Transaction } from 'sequelize'
import sequelizeBase from '../../config/mysql'
import { departmentModel, roleModel, userModel, userRoleModel } from '../../models/index'
import { UserPageParams, UpdateUserParams, UserParams } from '../../types/index'

class UserService {
  async getUserByName(name: string) {
    const result = await userModel.findOne({
      where: { username: name },
    })
    return result ? result.dataValues : null
  }

  async getUserInfoById(id: number) {
    const user = await userModel.findOne({
      where: { id },
      include: [
        {
          model: roleModel,
          attributes: ['id', 'role', 'roleName', 'isSuper'],
        },
      ],
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
      },
    })

    if (!user) return null

    const userData = user.dataValues
    const roleData = userData.sys_roles?.[0] || {}

    return {
      ...userData,
      roleId: roleData.id,
      role: roleData.role,
      roleName: roleData.roleName,
      isSuper: roleData.isSuper,
      sys_roles: undefined,
    }
  }

  async getUserList(params: UserPageParams) {
    const deptIds = await this.getDeptIds(params.deptId)
    const { count, rows } = await userModel.findAndCountAll({
      where: {
        username: { [Op.like]: `%${params.username || ''}%` },
        deptId: { [Op.in]: deptIds },
      },
      include: [
        {
          model: roleModel,
          attributes: ['id', 'role', 'roleName'],
        },
      ],
      attributes: {
        exclude: ['password', 'updatedAt', 'deletedAt'],
      },
      offset: params.pageSize * (params.pageNo - 1),
      limit: params.pageSize,
    })

    const formatRows = rows.map((user: any) => {
      const userJson = user.toJSON()
      const roleData = userJson.sys_roles?.[0] || {}
      return {
        ...userJson,
        roleId: roleData.id,
        role: roleData.role,
        roleName: roleData.roleName,
        sys_roles: undefined,
      }
    })

    return { count, rows: formatRows }
  }

  async addNewUser(user: UserParams) {
    return await sequelizeBase.transaction(async (t: Transaction) => {
      const newUser = await userModel.create(
        {
          username: user.username,
          password: user.password,
          deptId: user.deptId || 1,
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          remark: user.remark || '',
        },
        { transaction: t }
      )
      await userRoleModel.create(
        {
          userId: newUser.dataValues.id,
          roleId: user.roleId,
        },
        { transaction: t }
      )
      return newUser
    })
  }

  async updateUser(user: UpdateUserParams) {
    await sequelizeBase.transaction(async (t: Transaction) => {
      await userModel.update(
        {
          username: user.username,
          name: user.name,
          deptId: user.deptId,
          email: user.email,
          phone: user.phone,
          remark: user.remark,
        },
        { where: { id: user.id }, transaction: t }
      )
      
      const userRole = await userRoleModel.findOne({
        where: { userId: user.id },
        transaction: t
      })

      if (userRole) {
        await userRoleModel.update(
          { roleId: user.roleId },
          { where: { userId: user.id }, transaction: t }
        )
      } else {
        await userRoleModel.create({
          userId: user.id,
          roleId: user.roleId,
        }, { transaction: t })
      }
    })
    return 'ok'
  }

  async deleteUser(id: number) {
    await sequelizeBase.transaction(async (t: Transaction) => {
      await userModel.destroy({
        where: { id },
        force: true,
        transaction: t,
      })
      await userRoleModel.destroy({
        where: { userId: id },
        force: true,
        transaction: t,
      })
    })
    return 'ok'
  }

  // 辅助方法：递归获取部门ID
  private async getDeptIds(deptId: number): Promise<number[]> {
    const allDeptIds: number[] = []

    const getSubDeptIds = async (id: number) => {
      const subDepts = await departmentModel.findAll({
        attributes: ['id'],
        where: { parentId: id },
      })

      for (const subDept of subDepts) {
        allDeptIds.push(subDept.dataValues.id)
        await getSubDeptIds(subDept.dataValues.id)
      }
    }
    
    allDeptIds.push(deptId)
    await getSubDeptIds(deptId)

    return allDeptIds
  }
}

export default new UserService()
