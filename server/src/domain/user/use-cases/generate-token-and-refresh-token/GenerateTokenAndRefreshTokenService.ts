import { authConfig } from '@config/auth'
import { IUserTokenRepository } from '@modules/user/modules/user-token/repositories/IUserTokenRepository'
import { type User, type UserToken } from '@prisma/client'
import { IDateProvider } from '@shared/container/providers/date-provider/models/IDateProvider'
import { sign } from 'jsonwebtoken'
import { injectable } from '@nestjs/common'

import { CreateUserTokenUseCase } from '../create/user-token/CreateUserTokenUseCase'

interface IGenerateTokenAndRefreshTokenResponse {
  token: string
  refreshToken: UserToken['refreshToken']
}

@injectable()
class GenerateTokenAndRefreshTokenUseCase {
  private readonly createUserTokenUseCase: CreateUserTokenUseCase
  constructor(
    @inject('UserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider,
  ) {
    this.createUserTokenUseCase = new CreateUserTokenUseCase(
      this.userTokenRepository,
    )
  }

  async execute(user: User): Promise<IGenerateTokenAndRefreshTokenResponse> {
    const {
      secretToken,
      secretRefreshToken,
      expiresInToken,
      expiresInRefreshToken,
      expiresInRefreshTokenInDays,
    } = authConfig

    const token = sign({}, secretToken, {
      subject: user.username,
      expiresIn: expiresInToken,
    })

    const refreshToken = sign({}, secretRefreshToken, {
      subject: user.username,
      expiresIn: expiresInRefreshToken,
    })

    const refreshTokenExpiresAt = this.dateProvider.addDays(
      expiresInRefreshTokenInDays,
    )

    await this.createUserTokenUseCase.execute({
      token,
      refreshToken,
      expiresAt: refreshTokenExpiresAt,
      userId: user.id,
    })

    return {
      token,
      refreshToken,
    }
  }
}

export { GenerateTokenAndRefreshTokenUseCase }
