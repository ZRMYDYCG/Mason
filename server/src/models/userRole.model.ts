import { DataTypes } from 'sequelize'

import sequelize from '../config/mysql'

const model = sequelize.define(
  'sys_user_role',
  {
    userId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      field: 'user_id',
    },
    roleId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      field: 'role_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at',
    },
  },
  {
    // 启用paranoid 删除
    paranoid: true,
    freezeTableName: true,
  }
)

export default model
