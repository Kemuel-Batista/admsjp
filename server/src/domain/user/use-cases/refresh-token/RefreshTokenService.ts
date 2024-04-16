import { authConfig } from '@config/auth'
import { IUserTokenRepository } from '@modules/user/modules/user-token/repositories/IUserTokenRepository'
import { UsersRepository } from '@modules/user/repositories/UsersRepository'
import { type UserToken } from '@prisma/client'
import { IDateProvider } from '@shared/container/providers/date-provider/models/IDateProvider'
import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { AuthError } from '@shared/errors/AuthError'
import { verify } from 'jsonwebtoken'
import { injectable } from '@nestjs/common'

import { DeleteRefreshTokenUseCase } from '../delete/refresh-token/DeleteRefreshTokenUseCase'
import { FindUserByUsernameUseCase } from '../find/by-username/FindUserByUsernameUseCase'
import { FindUserTokenByRefreshTokenUseCase } from '../find/user-token/by-refresh-token/FindUserTokenByRefreshTokenUseCase'
import { GenerateTokenAndRefreshTokenUseCase } from '../generate-token-and-refresh-token/GenerateTokenAndRefreshTokenUseCase'

interface IPayload {
  sub: string
  email: string
}

interface IResponse {
  token: string
  refreshToken: UserToken['refreshToken']
}

@injectable()
class RefreshTokenUseCase {
  private readonly findUserByUserName: FindUserByUsernameUseCase
  private readonly findUserTokenByRefreshTokenUseCase: FindUserTokenByRefreshTokenUseCase
  private readonly deleteRefreshTokenUseCase: DeleteRefreshTokenUseCase
  private readonly generateTokenAndRefreshTokenUseCase: GenerateTokenAndRefreshTokenUseCase

  constructor(
    @inject('UserRepository')
    private readonly userRepository: UsersRepository,
    @inject('UserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider,
  ) {
    this.findUserByUserName = new FindUserByUsernameUseCase(this.userRepository)

    this.findUserTokenByRefreshTokenUseCase =
      new FindUserTokenByRefreshTokenUseCase(this.userTokenRepository)

    this.deleteRefreshTokenUseCase = new DeleteRefreshTokenUseCase(
      this.userTokenRepository,
    )

    this.generateTokenAndRefreshTokenUseCase =
      new GenerateTokenAndRefreshTokenUseCase(
        this.userTokenRepository,
        this.dateProvider,
      )
  }

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
        await this.generateTokenAndRefreshTokenUseCase.execute(user)

      return tokenAndRefreshToken
    } catch {
      throw new AuthError(
        'user.auth.refreshToken.invalidRefreshToken',
        HttpStatusCode.UNAUTHORIZED,
      )
    }
  }
}

export { RefreshTokenUseCase }
