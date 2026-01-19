import { Op } from 'sequelize'
import logModel from '../../models/log.model'
import { LogPageParams } from '../../types'

export interface LogCreateParams {
  userId?: number | null
  username?: string
  method: string
  path: string
  status?: number
  ip?: string
  userAgent?: string
  requestParams?: string
  duration?: number
}

class LogService {
  async createLog(payload: LogCreateParams) {
    try {
      await logModel.create({
        ...payload
      })
      return 'ok'
    } catch (error) {
      console.log(error)
    }
  }

  async getLogList(params: LogPageParams) {
    try {
      const whereConditions: Record<string, unknown> = {}

      if (params.username) {
        whereConditions.username = {
          [Op.like]: `%${params.username}%`
        }
      }

      if (params.path) {
        whereConditions.path = {
          [Op.like]: `%${params.path}%`
        }
      }

      if (params.method) {
        whereConditions.method = params.method.toUpperCase()
      }

      if (typeof params.status === 'number') {
        whereConditions.status = params.status
      }

      const startTime = params.startTime ? new Date(params.startTime) : null
      const endTime = params.endTime ? new Date(params.endTime) : null
      if (
        startTime &&
        !Number.isNaN(startTime.getTime()) &&
        endTime &&
        !Number.isNaN(endTime.getTime())
      ) {
        whereConditions.createdAt = {
          [Op.between]: [startTime, endTime]
        }
      } else if (startTime && !Number.isNaN(startTime.getTime())) {
        whereConditions.createdAt = {
          [Op.gte]: startTime
        }
      } else if (endTime && !Number.isNaN(endTime.getTime())) {
        whereConditions.createdAt = {
          [Op.lte]: endTime
        }
      }

      const { count, rows } = await logModel.findAndCountAll({
        where: whereConditions,
        attributes: {
          exclude: ['updatedAt', 'deletedAt']
        },
        order: [['createdAt', 'DESC']],
        offset: params.pageSize * (params.pageNo - 1),
        limit: params.pageSize
      })

      return {
        count,
        rows
      }
    } catch (error) {
      console.log(error)
    }
  }

  async deleteLog(id: number) {
    try {
      await logModel.destroy({
        where: {
          id
        },
        force: true
      })
      return 'ok'
    } catch (error) {
      console.log(error)
    }
  }
}

export default new LogService()
