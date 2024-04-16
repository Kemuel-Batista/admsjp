import { Injectable } from '@nestjs/common'
import { UserToken } from '@prisma/client'
import { verify } from 'jsonwebtoken'

import { authConfig } from '@/core/config/auth'
import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { AuthError } from '@/core/errors/AuthError'
import { DeleteRefreshTokenUseCase } from '@/domain/user/use-cases/delete/refresh-token/delete-refresh-token'
import { FindUserByUsernameUseCase } from '@/domain/user/use-cases/find/by-username/find-user-by-username'
import { FindUserTokenByRefreshTokenUseCase } from '@/domain/user/use-cases/find/user-token/by-refresh-token/find-user-token-by-refresh-token'

import { GenerateUserTokenUseCase } from '../generate/generate-user-token'

interface IPayload {
  sub: string
  email: string
}

interface IResponse {
  token: string
  refreshToken: UserToken['refreshToken']
}

interface RefreshTokenUseCaseRequest {
  refreshToken: UserToken['refreshToken']
}

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private findUserByUserName: FindUserByUsernameUseCase,
    private findUserTokenByRefreshTokenUseCase: FindUserTokenByRefreshTokenUseCase,
    private deleteRefreshTokenUseCase: DeleteRefreshTokenUseCase,
    private generateUserTokenUseCase: GenerateUserTokenUseCase,
  ) {}

  async execute({
    refreshToken,
  }: RefreshTokenUseCaseRequest): Promise<IResponse> {
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

      const userToken = await this.findUserTokenByRefreshTokenUseCase.execute(
        user.id,
        refreshToken,
      )

      if (userToken === null) {
        throw new AuthError(
          'user.auth.refreshToken.invalidRefreshToken',
          HttpStatusCode.UNAUTHORIZED,
        )
      }

      await this.deleteRefreshTokenUseCase.execute(userToken.id)

      const tokenAndRefreshToken =
        await this.generateUserTokenUseCase.execute(user)

      return tokenAndRefreshToken
    } catch {
      throw new AuthError(
        'user.auth.refreshToken.invalidRefreshToken',
        HttpStatusCode.UNAUTHORIZED,
      )
    }
  }
}
