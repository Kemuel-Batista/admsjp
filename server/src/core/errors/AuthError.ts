import { Response } from 'express'

import HttpStatusCode from '../enums/http-status-code'
import { i18n } from '../i18n/i18n'

export class AuthError extends Error {
  public readonly statusCode: number
  public readonly errorKey: string

  constructor(errorKey: string, statusCode = HttpStatusCode.UNAUTHORIZED) {
    const message = i18n.t(errorKey)

    super(message)

    Object.setPrototypeOf(this, AuthError.prototype)
    this.statusCode = statusCode
    this.errorKey = errorKey
  }

  public getResponse(response: Response): Response {
    return response.status(this.statusCode).json({
      code: this.errorKey,
      message: this.message,
    })
  }
}
