import { Controller, Post, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

import HttpStatusCode from '@/core/enums/http-status-code'
import { RefreshTokenUseCase } from '@/domain/admsjp/use-cases/user/refresh-token/refresh-token'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller('/refresh-token')
export class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const refreshToken =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token

    const token = await this.refreshTokenUseCase.execute(
      refreshToken,
      user.sub.username,
    )

    return response.status(HttpStatusCode.OK).json(token)
  }
}
