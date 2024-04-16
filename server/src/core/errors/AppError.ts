import { type Response } from 'express'

import HttpStatusCode from '../enums/HttpStatusCode'

export class AppError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode = HttpStatusCode.BAD_REQUEST) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
    this.statusCode = statusCode
  }

  public getResponse(response: Response): Response {
    return response.status(this.statusCode).json({
      message: this.message,
    })
  }
}
