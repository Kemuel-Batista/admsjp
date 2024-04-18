import { Controller, HttpCode, Post } from '@nestjs/common'
import { Request, Response } from 'express'

import HttpStatusCode from '@/core/enums/HttpStatusCode'

import { RefreshTokenUseCase } from '../../use-cases/refresh-token/refresh-token'

@Controller('/refresh-token')
export class RefreshTokenController {
  constructor(private refreshToken: RefreshTokenUseCase) {}

  @Post()
  @HttpCode(HttpStatusCode.OK)
  async handle(request: Request, response: Response): Promise<Response> {
    const refreshToken =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token

    const token = await this.refreshToken.execute(refreshToken)

    return response.json(token)
  }
}
