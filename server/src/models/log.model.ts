import { DataTypes } from 'sequelize'

import sequelize from '../config/mysql'

const model = sequelize.define(
  'sys_log',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      field: 'user_id',
    },
    username: {
      type: DataTypes.STRING(100),
    },
    method: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
    },
    ip: {
      type: DataTypes.STRING(64),
    },
    userAgent: {
      type: DataTypes.STRING(255),
      field: 'user_agent',
    },
    requestParams: {
      type: DataTypes.TEXT,
      field: 'request_params',
    },
    duration: {
      type: DataTypes.INTEGER,
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
    paranoid: true,
    freezeTableName: true,
  }
)

export default model
