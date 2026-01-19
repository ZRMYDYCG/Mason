import Joi from 'joi'
import { Context } from 'koa'
import logService from './log.service'
import { LogPageParams } from '../../types'

class LogController {
  async getLogList(ctx: Context) {
    const searchParams = ctx.request.body as LogPageParams
    const schema = Joi.object({
      pageNo: Joi.number().required(),
      pageSize: Joi.number().required(),
      username: Joi.string().empty(''),
      method: Joi.string().empty(''),
      path: Joi.string().empty(''),
      status: Joi.number().empty(null),
      startTime: Joi.string().empty(''),
      endTime: Joi.string().empty('')
    })

    try {
      await schema.validateAsync(searchParams)
    } catch (error) {
      return ctx.app.emit('error', error, ctx)
    }

    const result = await logService.getLogList(searchParams)
    ctx.body = {
      code: 200,
      data: result,
      msg: 'success'
    }
  }

  async deleteLog(ctx: Context) {
    const body = ctx.request.body as { id: number }
    const schema = Joi.object({
      id: Joi.number().required()
    })

    try {
      await schema.validateAsync(body)
    } catch (error) {
      return ctx.app.emit('error', error, ctx)
    }

    const result = await logService.deleteLog(body.id)
    ctx.body = {
      code: 200,
      data: result,
      msg: 'success'
    }
  }
}

export default new LogController()
