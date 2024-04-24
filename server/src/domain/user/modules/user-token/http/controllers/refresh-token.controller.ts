import { Controller, Post, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

import HttpStatusCode from '@/core/enums/http-status-code'

import { RefreshTokenUseCase } from '../../use-cases/refresh-token/refresh-token'

@Controller('/refresh-token')
export class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  @Post()
  async handle(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const refreshToken =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token

    const token = await this.refreshTokenUseCase.execute(refreshToken)

    return response.status(HttpStatusCode.OK).json(token)
  }
}
