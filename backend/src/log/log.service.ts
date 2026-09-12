import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { omitKeys, serializeBigInt } from '../utils/format'
import { LogListBody } from './log.schemas'

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

@Injectable()
export class LogService {
  constructor(private readonly prisma: PrismaService) {}

  async createLog(payload: LogCreateParams) {
    await this.prisma.sysLog.create({
      data: { ...payload, userId: payload.userId ? BigInt(payload.userId) : null }
    })
    return 'ok'
  }

  async getLogList(params: LogListBody) {
    const where: Prisma.SysLogWhereInput = { deletedAt: null }
    if (params.username) where.username = { contains: params.username }
    if (params.path) where.path = { contains: params.path }
    if (params.method) where.method = params.method.toUpperCase()
    if (typeof params.status === 'number') where.status = params.status
    const startTime = params.startTime ? new Date(params.startTime) : null
    const endTime = params.endTime ? new Date(params.endTime) : null
    if (
      startTime &&
      !Number.isNaN(startTime.getTime()) &&
      endTime &&
      !Number.isNaN(endTime.getTime())
    ) {
      where.createdAt = { gte: startTime, lte: endTime }
    } else if (startTime && !Number.isNaN(startTime.getTime())) {
      where.createdAt = { gte: startTime }
    } else if (endTime && !Number.isNaN(endTime.getTime())) {
      where.createdAt = { lte: endTime }
    }
    const [count, rows] = await Promise.all([
      this.prisma.sysLog.count({ where }),
      this.prisma.sysLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: params.pageSize * (params.pageNo - 1),
        take: params.pageSize
      })
    ])
    return serializeBigInt({
      count,
      rows: rows.map((row) => omitKeys(row, ['updatedAt', 'deletedAt']))
    })
  }

  async deleteLog(id: number) {
    await this.prisma.sysLog.delete({ where: { id: BigInt(id) } })
    return 'ok'
  }
}
