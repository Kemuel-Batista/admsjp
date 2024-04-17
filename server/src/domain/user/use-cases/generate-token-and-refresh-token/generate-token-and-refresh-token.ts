import { Injectable } from '@nestjs/common'
import { User, UserToken } from '@prisma/client'
import { sign } from 'jsonwebtoken'

import { authConfig } from '@/core/config/auth'
import { IDateProvider } from '@/core/providers/date-provider/models/date-provider'

import { CreateUserTokenUseCase } from '../create/user-token/create-user-token'

interface IGenerateTokenAndRefreshTokenResponse {
  token: string
  refreshToken: UserToken['refreshToken']
}

@Injectable()
class GenerateTokenAndRefreshTokenUseCase {
  constructor(
    private dateProvider: IDateProvider,
    private createUserToken: CreateUserTokenUseCase,
  ) {}

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

    await this.createUserToken.execute({
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
