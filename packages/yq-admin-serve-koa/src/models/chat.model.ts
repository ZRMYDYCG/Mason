/*
 * @Author: ZRMYDYCG
 * @Date: 2024-11
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-11
 * @Description:
 */
import { DataTypes } from 'sequelize'
import sequelize from '../config/mysql'

const model = sequelize.define(
  'sys_chat',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    sendId: {
      type: DataTypes.BIGINT, // 发送人 id
      allowNull: false,
      field: 'send_id',
    },
    recipientId: {
      type: DataTypes.BIGINT, // 接收人 id
      allowNull: false,
      field: 'recipient_id',
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER, // 内容类型
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER, // 是否发送成功
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    isRead: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0, // 默认值为 0，表示未读
      field: 'is_read',
    },
    avatar: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

export default model
