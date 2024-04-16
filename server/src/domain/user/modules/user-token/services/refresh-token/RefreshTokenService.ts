import { authConfig } from '@config/auth'
import { IUserTokenRepository } from '@modules/user/modules/user-token/repositories/IUserTokenRepository'
import { UsersRepository } from '@modules/user/repositories/UsersRepository'
import { type UserToken } from '@prisma/client'
import { IDateProvider } from '@shared/container/providers/date-provider/models/IDateProvider'
import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { AuthError } from '@shared/errors/AuthError'
import { verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { DeleteRefreshTokenService } from '../../../../services/delete/refresh-token/DeleteRefreshTokenService'
import { FindUserByUsernameService } from '../../../../services/find/by-username/FindUserByUsernameService'
import { FindUserTokenByRefreshTokenService } from '../../../../services/find/user-token/by-refresh-token/FindUserTokenByRefreshTokenService'
import { GenerateUserTokenService } from '../generate/GenerateUserTokenService'

interface IPayload {
  sub: string
  email: string
}

interface IResponse {
  token: string
  refreshToken: UserToken['refreshToken']
}

@injectable()
class RefreshTokenService {
  private readonly findUserByUserName: FindUserByUsernameService
  private readonly findUserTokenByRefreshTokenService: FindUserTokenByRefreshTokenService
  private readonly deleteRefreshTokenService: DeleteRefreshTokenService
  private readonly generateUserTokenService: GenerateUserTokenService

  constructor(
    @inject('UserRepository')
    private readonly userRepository: UsersRepository,
    @inject('UserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider,
  ) {
    this.findUserByUserName = new FindUserByUsernameService(this.userRepository)

    this.findUserTokenByRefreshTokenService =
      new FindUserTokenByRefreshTokenService(this.userTokenRepository)

    this.deleteRefreshTokenService = new DeleteRefreshTokenService(
      this.userTokenRepository,
    )

    this.generateUserTokenService = new GenerateUserTokenService(
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

      const userToken = await this.findUserTokenByRefreshTokenService.execute(
        user.id,
        refreshToken,
      )

      if (userToken === null) {
        throw new AuthError(
          'user.auth.refreshToken.invalidRefreshToken',
          HttpStatusCode.UNAUTHORIZED,
        )
      }

      await this.deleteRefreshTokenService.execute(userToken.id)

      const tokenAndRefreshToken =
        await this.generateUserTokenService.execute(user)

      return tokenAndRefreshToken
    } catch {
      throw new AuthError(
        'user.auth.refreshToken.invalidRefreshToken',
        HttpStatusCode.UNAUTHORIZED,
      )
    }
  }
}

export { RefreshTokenService }
