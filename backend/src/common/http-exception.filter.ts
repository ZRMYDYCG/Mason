import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { ZodValidationException } from 'nestjs-zod'
import { AppError, errorCodeMap } from './app-error'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse()

    if (exception instanceof AppError) {
      const code = exception.bodyCode ?? errorCodeMap[exception.message] ?? 404
      response.status(exception.httpStatus).json({ code, data: null, msg: exception.message })
      return
    }

    if (exception instanceof ZodValidationException) {
      response.status(200).json({ code: 404, data: null, msg: exception.message })
      return
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus()
      const message = exception.message || '失败'
      response.status(status === HttpStatus.UNAUTHORIZED ? 401 : 200).json({
        code: status,
        data: null,
        msg: message
      })
      return
    }

    const message = exception instanceof Error ? exception.message : '失败'
    const code = errorCodeMap[message] ?? 404
    response.status(200).json({ code, data: null, msg: message })
  }
}
