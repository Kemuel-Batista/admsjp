import { Injectable } from '@nestjs/common'
import { UserToken } from '@prisma/client'
import { verify } from 'jsonwebtoken'

import { authConfig } from '@/core/config/auth'
import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { AuthError } from '@/core/errors/AuthError'

import { DeleteRefreshTokenUseCase } from '../delete/refresh-token/delete-refresh-token'
import { FindUserByUsernameUseCase } from '../find/by-username/find-user-by-username'
import { FindUserTokenByRefreshTokenUseCase } from '../find/user-token/by-refresh-token/find-user-token-by-refresh-token'
import { GenerateTokenAndRefreshTokenUseCase } from '../generate-token-and-refresh-token/generate-token-and-refresh-token'

interface IPayload {
  sub: string
  email: string
}

interface IResponse {
  token: string
  refreshToken: UserToken['refreshToken']
}

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private findUserByUserName: FindUserByUsernameUseCase,
    private findUserTokenByRefreshToken: FindUserTokenByRefreshTokenUseCase,
    private deleteRefreshToken: DeleteRefreshTokenUseCase,
    private generateTokenAndRefreshToken: GenerateTokenAndRefreshTokenUseCase,
  ) {}

  async execute(refreshToken: UserToken['refreshToken']): Promise<IResponse> {
    try {
      const { sub: username } = verify(
        refreshToken,
        authConfig.secretRefreshToken,
      ) as IPayload

      const user = await this.findUserByUserName.execute(username)

      if (user === null) {
        throw new AuthError(
          'user.auth.refreshToken.invalidRefreshToken',
          HttpStatusCode.UNAUTHORIZED,
        )
      }

      const userToken = await this.findUserTokenByRefreshToken.execute(
        user.id,
        refreshToken,
      )

      if (userToken === null) {
        throw new AuthError(
          'user.auth.refreshToken.invalidRefreshToken',
          HttpStatusCode.UNAUTHORIZED,
        )
      }

      await this.deleteRefreshToken.execute(userToken.id)

      const tokenAndRefreshToken =
        await this.generateTokenAndRefreshToken.execute(user)

      return tokenAndRefreshToken
    } catch {
      throw new AuthError(
        'user.auth.refreshToken.invalidRefreshToken',
        HttpStatusCode.UNAUTHORIZED,
      )
    }
  }
}
