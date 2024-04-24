import { Injectable } from '@nestjs/common'
import { User, UserToken } from '@prisma/client'

import { authConfig } from '@/core/config/auth'
import { IDateProvider } from '@/domain/admsjp/providers/date-provider'
import { Encrypter } from '@/domain/admsjp/cryptography/encrypter'

import { CreateUserTokenUseCase } from '../create/create-user-token'

interface IGenerateTokenAndRefreshTokenResponse {
  token: string
  refreshToken: UserToken['refreshToken']
}

@Injectable()
export class GenerateUserTokenUseCase {
  constructor(
    private dateProvider: IDateProvider,
    private createUserTokenUseCase: CreateUserTokenUseCase,
    private encrypter: Encrypter,
  ) {}

  async execute(user: User): Promise<IGenerateTokenAndRefreshTokenResponse> {
    const { expiresInRefreshTokenInDays } = authConfig

    const token = await this.encrypter.encrypt({
      sub: user,
    })

    const refreshToken = await this.encrypter.encrypt({
      sub: user,
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
