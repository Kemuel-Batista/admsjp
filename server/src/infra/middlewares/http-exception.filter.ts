import { randomUUID } from 'node:crypto'

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { Request, Response } from 'express'

import { logger } from '../config/winston-config'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    const transactionId = randomUUID()

    logger.error(
      `
      [TRANSACTION_ID]: ${transactionId}
      [METHOD]: ${request.method}
      [URL]: ${request.url}
      [FULL_URL]: ${request.protocol}://${request.get('host') || ''}${
        request.originalUrl
      }
      [HEADERS]: ${JSON.stringify(request.headers)}
      [BODY]: ${JSON.stringify(request.body)}
      [PARAMS]: ${JSON.stringify(request.params)}
      [QUERY]: ${JSON.stringify(request.query)}
      [USER]: ${JSON.stringify(request.user)}
      [MESSAGE]: ${exception.message}
      [STACK]: ${exception.stack || ''}]`,
    )

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
