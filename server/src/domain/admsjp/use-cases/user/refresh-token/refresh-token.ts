import { Injectable } from '@nestjs/common'
import { User, UserToken } from '@prisma/client'

import HttpStatusCode from '@/core/enums/http-status-code'
import { AuthError } from '@/core/errors/AuthError'

import { DeleteRefreshTokenUseCase } from '../delete/refresh-token/delete-refresh-token'
import { FindUserByUsernameUseCase } from '../find/by-username/find-user-by-username'
import { FindUserTokenByRefreshTokenUseCase } from '../find/user-token/by-refresh-token/find-user-token-by-refresh-token'
import { GenerateTokenAndRefreshTokenUseCase } from '../generate-token-and-refresh-token/generate-token-and-refresh-token'

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

  async execute(
    refreshToken: UserToken['refreshToken'],
    username: User['username'],
  ): Promise<IResponse> {
    try {
      const user = await this.findUserByUserName.execute(username)

      if (user === null) {
        throw new AuthError(
          'user.auth.refreshToken.invalidRefreshToken',
          HttpStatusCode.PRECONDITION_FAILED,
        )
      }

      const userToken = await this.findUserTokenByRefreshToken.execute(
        user.id,
        refreshToken,
      )

      if (userToken === null) {
        throw new AuthError(
          'user.auth.refreshToken.invalidRefreshToken',
          HttpStatusCode.PRECONDITION_FAILED,
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
