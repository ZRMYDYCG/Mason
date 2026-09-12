import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { CheckPermission } from '../casl/check-permission.decorator'
import { PERMISSION_CODES } from '../casl/permissions'
import { ZodBodyPipe } from '../common/zod-validation.pipe'
import { LogService } from './log.service'
import { IdBody, LogListBody, idSchema, logListSchema } from './log.schemas'

@Controller('log')
@UseGuards(AuthGuard)
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post('list')
  @CheckPermission(PERMISSION_CODES.LOG_LIST)
  async getLogList(@Body(new ZodBodyPipe(logListSchema)) body: LogListBody) {
    return { code: 200, data: await this.logService.getLogList(body), msg: 'success' }
  }

  @Post('delete')
  @CheckPermission(PERMISSION_CODES.LOG_DELETE)
  async deleteLog(@Body(new ZodBodyPipe(idSchema)) body: IdBody) {
    return { code: 200, data: await this.logService.deleteLog(body.id), msg: 'success' }
  }
}
